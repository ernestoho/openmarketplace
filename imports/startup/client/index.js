import 'isomorphic-fetch'

import Vue from 'vue'
import AppLayout from '/imports/ui/layouts/AppLayout.vue'
import { routerFactory } from './router-config.js'

import 'buefy/lib/buefy.css'
import '/imports/ui/stylesheets/font-awesome.css'

import './plugins'

Meteor.startup(function () {
  const router = routerFactory.create()
  new Vue({router, render: layout => layout(AppLayout)}).$mount('app')
})
