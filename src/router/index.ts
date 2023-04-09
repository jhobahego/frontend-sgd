import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/index/HomeView.vue'
import AboutView from '@/views/about/AboutView.vue'
import DocumentsView from '@/views/documents/DocumentsView.vue'
import PurchaseView from '@/views/documents/PurchaseView.vue'
import DocumentDetail from '@/views/documents/DocumentDetail.vue'

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
    path: '/documentos/comprar',
    name: 'purchaseView',
    component: PurchaseView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
