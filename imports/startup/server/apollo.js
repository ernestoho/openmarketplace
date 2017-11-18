import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'

import { commentResolvers } from '../imports/api/comments/comment-resolvers'
import { commentTypes, commentQueries } from '../imports/api/comments/comment-schema'
import { postTypes, postQueries } from '../imports/api/posts/post-schema'
import { postResolvers } from '../imports/api/posts/post-resolvers'

Meteor.startup(() => {
  // Startup Apollo Server on startup Meteor Server
  createApolloServer({
    schema: makeExecutableSchema({
      typeDefs: [
        commentTypes,
        postTypes,
        `type Query {
          ${postQueries}
          ${commentQueries}
        }`,
        'schema { query: Query }'
      ],
      resolvers: {
        ...commentResolvers,
        ...postResolvers
      }
    })
  })
})