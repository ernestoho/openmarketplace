// Global Routes
import NotFound from '../../ui/pages/NotFound.vue'
// Store Routes
import Home from '../../ui/pages/store/Home.vue'
// Office Routes
import Dashboard from '../../ui/pages/office/Dashboard.vue'

const globalRoutes = [
  { path: '*', name: 'not-found', component: NotFound }
]

const storeRoutes = [
  { path: '/', name: 'home', component: Home }
]

const officeRoutes = [
  {
    path: '/office',
    children: [
      { path: '/dashboard', name: 'office_dashboard', component: Dashboard }
    ]
  }
]

export default globalRoutes.push(...storeRoutes).push(...officeRoutes)
