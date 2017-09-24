// Utilities to generate the app's GraphQL schema
// Based on https://github.com/vulcanjs/vulcan

import deepmerge from 'deepmerge'
import GraphQLJSON from 'graphql-type-json'
import GraphQLDate from 'graphql-date'
import OM from '/lib/config.js'
import { Utils } from '/lib/utils.js'
import { disableFragmentWarnings } from 'graphql-tag'

disableFragmentWarnings()

const getGraphQLType = (schema, fieldName) => {
  const field = schema[fieldName]
  const type = field.type.singleType
  const typeName = typeof type === 'function' ? type.name : type

  switch (typeName) {
    case 'String':
      return 'String'

    case 'Boolean':
      return 'Boolean'

    case 'Number':
      return 'Float'

    case 'SimpleSchema.Integer':
      return 'Int'

    case 'Array':
      const arrayItemFieldName = `${fieldName}.$`
      if (schema[arrayItemFieldName]) {
        const arrayItemType = getGraphQLType(schema, arrayItemFieldName)
        return arrayItemType ? `[${arrayItemType}]` : null
      }
      return null

    case 'Object':
      return 'JSON'

    case 'Date':
      return 'Date'

    default:
      return null
  }
}

export const GraphQLSchema = {
  // collections used to auto-generate schemas
  collections: [],

  addCollection (collection) {
    this.collections.push(collection)
  },

  // generate GraphQL schemas for all registered collections
  getCollectionsSchemas () {
    const collectionsSchemas = this.collections.map(collection => {
      return this.generateSchema(collection)
    }).join('\n')
    return collectionsSchemas
  },

  // additional schemas
  schemas: [],

  addSchema (schema) {
    this.schemas.push(schema)
  },

  // get extra schemas defined manually
  getAdditionalSchemas () {
    const additionalSchemas = this.schemas.join('\n')
    return additionalSchemas
  },

  // queries
  queries: [],

  addQuery (query) {
    this.queries.push(query)
  },

  // mutations
  mutations: [],

  addMutation (mutation) {
    this.mutations.push(mutation)
  },

  // add resolvers
  resolvers: {
    JSON: GraphQLJSON,
    Date: GraphQLDate
  },

  addResolvers (resolvers) {
    this.resolvers = deepmerge(this.resolvers, resolvers)
  },

  removeResolver (typeName, resolverName) {
    delete this.resolvers[typeName][resolverName]
  },

  // add objects to context
  context: {},

  addToContext (object) {
    this.context = deepmerge(this.context, object)
  },

  // generate a GraphQL schema corresponding to a given collection
  generateSchema (collection) {
    const collectionName = collection.options.collectionName

    const mainTypeName = collection.typeName ? collection.typeName : Utils.camelToSpaces(_.initial(collectionName).join(''))

    let mainSchema = []
    let inputSchema = []
    let unsetSchema = []

    _.forEach(schema, (field, fieldName) => {
      const fieldType = getGraphQLType(schema, fieldName)

      if (fieldName.indexOf('$') === -1) { // skip fields containing "$" in their name
        // if field has a resolveAs, push it to schema
        if (field.resolveAs) {
          if (typeof field.resolveAs === 'string') {
            // if resolveAs is a string, push it and done
            mainSchema.push(field.resolveAs)
          } else {
            // if resolveAs is an object, first push its type definition
            // include arguments if there are any
            mainSchema.push(`${field.resolveAs.fieldName}${field.resolveAs.arguments ? `(${field.resolveAs.arguments})` : ''}: ${field.resolveAs.type}`)

            // then build actual resolver object and pass it to addGraphQLResolvers
            const resolver = {
              [mainTypeName]: {
                [field.resolveAs.fieldName]: field.resolveAs.resolver
              }
            }
            addGraphQLResolvers(resolver)
          }

          // if addOriginalField option is enabled, also add original field to schema
          if (field.resolveAs.addOriginalField && fieldType) {
            mainSchema.push(`${fieldName}: ${fieldType}`)
          }
        } else {
          // try to guess GraphQL type
          if (fieldType) {
            mainSchema.push(`${fieldName}: ${fieldType}`)
          }
        }

        if (field.insertableBy || field.editableBy) {
          // note: marking a field as required makes it required for updates, too,
          // which makes partial updates impossible
          // const isRequired = field.optional ? '' : '!';

          const isRequired = ''

          // 2. input schema
          inputSchema.push(`${fieldName}: ${fieldType}${isRequired}`)

          // 3. unset schema
          unsetSchema.push(`${fieldName}: Boolean`)
        }
      }
    })

    const { interfaces = [] } = collection.options
    const graphQLInterfaces = interfaces.length ? `implements ${interfaces.join(`, `)} ` : ''

    let graphQLSchema = `
      type ${mainTypeName} ${graphQLInterfaces}{
        ${mainSchema.join('\n  ')}
      }
    `

    graphQLSchema += `
      input ${collectionName}Input {
        ${inputSchema.length ? inputSchema.join('\n  ') : '_blank: Boolean'}
      }
      input ${collectionName}Unset {
        ${inputSchema.length ? unsetSchema.join('\n  ') : '_blank: Boolean'}
      }
    `

    return graphQLSchema
  }
}

OM.getGraphQLSchema = () => {
  const schema = GraphQLSchema.finalSchema[0]
  console.log(schema)
  return schema
}

export const addGraphQLCollection = GraphQLSchema.addCollection.bind(GraphQLSchema)
export const addGraphQLSchema = GraphQLSchema.addSchema.bind(GraphQLSchema)
export const addGraphQLQuery = GraphQLSchema.addQuery.bind(GraphQLSchema)
export const addGraphQLMutation = GraphQLSchema.addMutation.bind(GraphQLSchema)
export const addGraphQLResolvers = GraphQLSchema.addResolvers.bind(GraphQLSchema)
export const removeGraphQLResolver = GraphQLSchema.removeResolver.bind(GraphQLSchema)
export const addToGraphQLContext = GraphQLSchema.addToContext.bind(GraphQLSchema)
