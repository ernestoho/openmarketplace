// Server entry point, imports all server code

import '/imports/startup/server'
import '/imports/startup/both'

import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'

import { typeDefs, resolvers } from '/imports/api/schema.js'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

createApolloServer({
  schema
})
