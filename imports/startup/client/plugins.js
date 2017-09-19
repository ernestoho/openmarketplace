import Vue from 'vue'
import VueMeteorTracker from 'vue-meteor-tracker'
import VueObserveVisibility from 'vue-observe-visibility'
import VueTheMask from 'vue-the-mask'
import Buefy from 'buefy'

import { InputFocus } from './directives'

import * as filters from './filters'

Vue.use(VueMeteorTracker)
Vue.config.meteor.freeze = true

Vue.use(VueObserveVisibility)
Vue.use(VueTheMask)

Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultSnackbarDuration: 5000,
  defaultToastDuration: 5000,
  defaultContentElement: '#app'
})

// Apply Global Vue Directives
Vue.directive('focus', InputFocus)

// Apply Global Vue Filters
for (const key in filters) {
  Vue.filter(key, filters[key])
}
