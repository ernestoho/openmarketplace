import Vue from 'vue'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createMeteorNetworkInterface } from './apollo-client.js'

import AppLayout from '/imports/ui/layouts/AppLayout.vue'

import routes from './routes.js'

import 'buefy/lib/buefy.css'
import '/imports/ui/stylesheets/font-awesome.css'

import './plugins'

Vue.use(VueApollo)
Vue.use(VueRouter)

Meteor.startup(function () {
  const router = new VueRouter({
    mode: 'history',
    routes
  })

  const apolloClient = new ApolloClient({
    networkInterface: createMeteorNetworkInterface(),
    connectToDevTools: Meteor.isDevelopment
  })

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })

  new Vue({
    router,
    apolloProvider,
    render: layout => layout(AppLayout)
  }).$mount('app')
})
