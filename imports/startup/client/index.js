import { Meteor } from 'meteor/meteor'
import Vue from 'vue'
import Buefy from 'buefy'
import VueTheMask from 'vue-the-mask'
import VueMeteorTracker from 'vue-meteor-tracker'
import { InputFocus } from './directives.js'
import { routerFactory } from './router-config.js'

import AppLayout from '/imports/ui/layouts/AppLayout.vue'

import 'buefy/lib/buefy.css'

import '/imports/ui/stylesheets/font-awesome.css'

Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultSnackbarDuration: 5000,
  defaultToastDuration: 5000,
  defaultContentElement: '#app'
})
Vue.use(VueTheMask)
Vue.use(VueMeteorTracker)

Vue.directive('focus', InputFocus)

Meteor.startup(function () {
  const router = routerFactory.create()
  new Vue({router, render: layout => layout(AppLayout)}).$mount('app')
})
