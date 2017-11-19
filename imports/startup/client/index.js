import Vue from 'vue'
import Buefy from 'buefy'
import VueTheMask from 'vue-the-mask'
import VueMeteorTracker from 'vue-meteor-tracker'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-client'
import { meteorClientConfig } from 'meteor/apollo'

import AppLayout from '/imports/ui/layouts/AppLayout.vue'

import routes from './routes.js'

import 'buefy/lib/buefy.css'
import '/imports/ui/stylesheets/font-awesome.css'
import '/imports/ui/stylesheets/material-icons.css'

import './plugins'

Vue.use(Buefy, {
  defaultSnackbarDuration: 5000, defaultToastDuration: 5000
})

Vue.use(VueApollo)
Vue.use(VueMeteorTracker)
Vue.use(VueRouter)
Vue.use(VueTheMask)

Meteor.startup(function() {
  const router = new VueRouter({
    mode: 'history', routes
  })

  const apolloProvider = new VueApollo({
    defaultClient: new ApolloClient(meteorClientConfig())
  })

  new Vue({
    router,
    apolloProvider,
    render: layout => layout(AppLayout)
  }).$mount('app')
})
