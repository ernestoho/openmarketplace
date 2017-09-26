import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import { addGraphQLCollection, addGraphQLQuery, addGraphQLMutation, addGraphQLResolvers, addToGraphQLContext } from './graphql.js'
import { runCallbacks } from '../lib/callbacks.js'
import { getSetting } from '../lib/settings.js'
import { registerFragment, getDefaultFragmentText } from '../lib/fragments.js'

export const Collections = []

Mongo.Collection.prototype.attachSchema = function (schemaOrFields) {
  if (schemaOrFields instanceof SimpleSchema) {
    this.simpleSchema = () => schemaOrFields
  } else {
    this.simpleSchema().extend(schemaOrFields)
  }
}

Mongo.Collection.prototype.addField = function (fieldOrFieldArray) {
  const collection = this
  const schema = collection.simpleSchema()._schema
  const fieldSchema = {}
  const fieldArray = Array.isArray(fieldOrFieldArray) ? fieldOrFieldArray : [fieldOrFieldArray]

  fieldArray.forEach(function (field) {
    const newField = {...schema[field.fieldName], ...field.fieldSchema}
    fieldSchema[field.fieldName] = newField
  })

  collection.attachSchema(fieldSchema)
}

Mongo.Collection.prototype.removeField = function (fieldName) {
  const collection = this
  const schema = _.omit(collection.simpleSchema()._schema, fieldName)

  collection.attachSchema(new SimpleSchema(schema))
}

Mongo.Collection.prototype.addDefaultView = function (view) {
  this.defaultView = view
}

Mongo.Collection.prototype.addView = function (viewName, view) {
  this.views[viewName] = view
}

// see https://github.com/dburles/meteor-collection-helpers/blob/master/collection-helpers.js
Mongo.Collection.prototype.helpers = function (helpers) {
  const self = this

  if (self._transform && !self._helpers) {
    throw new Meteor.Error("Can't apply helpers to '" + self._name + "' a transform function already exists!")
  }

  if (!self._helpers) {
    self._helpers = function Document (doc) { return _.extend(this, doc) }
    self._transform = function (doc) {
      return new self._helpers(doc)
    }
  }

  _.each(helpers, function (helper, key) {
    self._helpers.prototype[key] = helper
  })
}

export const createCollection = options => {
  const {collectionName, typeName, schema, resolvers, mutations, generateGraphQLSchema = true, dbCollectionName} = options

  // initialize new Mongo collection
  const collection = collectionName === 'Users' ? Meteor.users : new Mongo.Collection(dbCollectionName || collectionName.toLowerCase())

  // decorate collection with options
  collection.options = options

  // add typeName
  collection.typeName = typeName

  // add views
  collection.views = []

  if (schema) {
    // attach schema to collection
    collection.attachSchema(new SimpleSchema(schema))
  }

  const context = {}
  context[collectionName] = collection
  addToGraphQLContext(context)

  if (generateGraphQLSchema) {
    // add collection to list of dynamically generated GraphQL schemas
    addGraphQLCollection(collection)

    // Queries

    if (resolvers) {
      const queryResolvers = {}
      // list/find()
      if (resolvers.list) { // e.g. ""
        addGraphQLQuery(`${resolvers.list.name}(terms: JSON, offset: Int, limit: Int): [${typeName}]`)
        queryResolvers[resolvers.list.name] = resolvers.list.resolver.bind(resolvers.list)
      }
      // single/findOne()
      if (resolvers.single) {
        addGraphQLQuery(`${resolvers.single.name}(documentId: String, slug: String): ${typeName}`)
        queryResolvers[resolvers.single.name] = resolvers.single.resolver.bind(resolvers.single)
      }
      // total/count()
      if (resolvers.total) {
        addGraphQLQuery(`${resolvers.total.name}(terms: JSON): Int`)
        queryResolvers[resolvers.total.name] = resolvers.total.resolver
      }
      addGraphQLResolvers({ Query: { ...queryResolvers } })
    }

    // Mutations

    if (mutations) {
      const mutationResolvers = {}
      // new
      if (mutations.new) { // e.g. "moviesNew(document: moviesInput) : Movie"
        addGraphQLMutation(`${mutations.new.name}(document: ${collectionName}Input) : ${typeName}`)
        mutationResolvers[mutations.new.name] = mutations.new.mutation.bind(mutations.new)
      }
      // edit
      if (mutations.edit) { // e.g. "moviesEdit(documentId: String, set: moviesInput, unset: moviesUnset) : Movie"
        addGraphQLMutation(`${mutations.edit.name}(documentId: String, set: ${collectionName}Input, unset: ${collectionName}Unset) : ${typeName}`)
        mutationResolvers[mutations.edit.name] = mutations.edit.mutation.bind(mutations.edit)
      }
      // remove
      if (mutations.remove) { // e.g. "moviesRemove(documentId: String) : Movie"
        addGraphQLMutation(`${mutations.remove.name}(documentId: String) : ${typeName}`)
        mutationResolvers[mutations.remove.name] = mutations.remove.mutation.bind(mutations.remove)
      }
      addGraphQLResolvers({ Mutation: { ...mutationResolvers } })
    }
  }

  registerFragment(getDefaultFragmentText(collection))

  collection.getParameters = (terms = {}, apolloClient) => {
    let parameters = {
      selector: {},
      options: {}
    }

    parameters = runCallbacks(`${collectionName.toLowerCase()}.parameters`, parameters, _.clone(terms), apolloClient)

    // remove any null fields (setting a field to null means it should be deleted)
    _.keys(parameters.selector).forEach(key => {
      if (parameters.selector[key] === null) delete parameters.selector[key]
    })
    if (parameters.options.sort) {
      _.keys(parameters.options.sort).forEach(key => {
        if (parameters.options.sort[key] === null) delete parameters.options.sort[key]
      })
    }

    // limit number of items to 200 by default
    const maxDocuments = getSetting('maxDocumentsPerRequest', 200)
    parameters.options.limit = (!terms.limit || terms.limit < 1 || terms.limit > maxDocuments) ? maxDocuments : terms.limit

    return parameters
  }

  Collections.push(collection)

  return collection
}
