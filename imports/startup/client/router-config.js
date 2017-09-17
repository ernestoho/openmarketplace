// Vue.js Router Configurations

import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'
import NotFound from '/imports/ui/pages/NotFound.vue'

export const routerFactory = new RouterFactory({
  mode: 'history',
  scrollBehavior: nativeScrollBehavior
})

RouterFactory.configure(router => {
  router.addRoute({
    path: '*',
    component: NotFound
  })
}, -1)
