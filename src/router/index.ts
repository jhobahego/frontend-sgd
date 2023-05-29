import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/index/HomeView.vue'
import AboutView from '@/views/about/AboutView.vue'
import DocumentsView from '@/views/documents/DocumentsView.vue'
import PurchaseView from '@/views/documents/PurchaseView.vue'
import DocumentDetail from '@/views/documents/DocumentDetail.vue'
import DocumentForm from '@/views/documents/DocumentFormView.vue'
import AuthView from '@/views/auth/AuthView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/documentos',
    name: 'documentsView',
    component: DocumentsView
  },
  {
    path: '/documento/:id',
    name: 'documentDetalView',
    component: DocumentDetail
  },
  {
    path: '/documentos/comprar/:id',
    name: 'purchaseView',
    component: PurchaseView
  },
  {
    path: '/autenticacion',
    name: 'authView',
    component: AuthView
  },
  {
    path: '/documentos/guardar',
    name: 'documentFormView',
    component: DocumentForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
