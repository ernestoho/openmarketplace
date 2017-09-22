import NotFound from '/imports/ui/pages/NotFound.vue'
import Home from '/imports/ui/pages/Home.vue'

export default [
  { path: '/', name: 'home', component: Home },
  { path: '*', name: 'not-found', component: NotFound }
]
