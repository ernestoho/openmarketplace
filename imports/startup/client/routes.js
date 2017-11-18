import NotFound from '/imports/ui/pages/NotFound.vue'
import Home from '/imports/ui/pages/Home.vue'
import Product from '/imports/ui/pages/Product.vue'

export default [
  { path: '/', name: 'home', component: Home },
  { path: '/products', name: 'products', component: Home },
  { path: '*', name: 'not-found', component: NotFound }
]
