// Client entry point, imports all client code

import '/imports/startup/client'
import '/imports/startup/both'

import ApolloClient from 'apollo-client'
import { meteorClientConfig } from 'meteor/apollo'

const client = new ApolloClient(meteorClientConfig())

console.log(client)
