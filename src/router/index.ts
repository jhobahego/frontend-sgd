import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/index/HomeView.vue'
import AboutView from '@/views/about/AboutView.vue'
import DocumentsView from '@/views/documents/DocumentsView.vue'
import PurchaseView from '@/views/documents/PurchaseView.vue'
import UsersView from '@/views/usuarios/UsersView.vue'
import EditView from '@/views/usuarios/EditView.vue'
import DocumentDetail from '@/views/documents/DocumentDetail.vue'
import DocumentForm from '@/views/documents/DocumentFormView.vue'
import AuthView from '@/views/auth/AuthView.vue'
import AllDocuments from '@/views/admin/AllDocumentsView.vue'
import DocumentDetailAdmin from '@/views/admin/DocumentDetailView.vue'
import { useAuth } from '@/store/authStore'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requireAuth: false,
      rolNecesario: "USER"
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requireAuth: false,
      rolNecesario: "USER"
    }
  },
  {
    path: '/documentos',
    name: 'documentsView',
    component: DocumentsView,
    meta: {
      requireAuth: true,
      rolNecesario: "USER"
    }
  },
  {
    path: '/documento/:id',
    name: 'documentDetalView',
    component: DocumentDetail,
    meta: {
      requireAuth: true,
      rolNecesario: "USER"
    }
  },
  {
    path: '/documentos/comprar/:id',
    name: 'purchaseView',
    component: PurchaseView,
    meta: {
      requireAuth: true,
      rolNecesario: "USER"
    }
  },
  {
    path: '/autenticacion',
    name: 'authView',
    component: AuthView,
    meta: {
      requireAuth: false,
      rolNecesario: "USER"
    }
  },
  {
    path: '/documentos/guardar',
    name: 'documentFormView',
    component: DocumentForm,
    meta: {
      requireAuth: true,
      rolNecesario: "ADMIN"
    }
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsersView,
    meta: {
      requireAuth: true,
      rolNecesario: "ADMIN"
    }
  },
  {
    path: '/usuarios/:id',
    name: 'EditarUsuario',
    component: EditView,
    meta: {
      requireAuth: true,
      rolNecesario: "ADMIN"
    }
  },
  {
    path: '/admin/documentos',
    name: 'AllDocumentsAdmin',
    component: AllDocuments,
    meta: {
      requireAuth: true,
      rolNecesario: "ADMIN"
    }
  },
  {
    path: '/admin/documentos/:id',
    name: 'DocumentDetailAdmin',
    component: DocumentDetailAdmin,
    meta: {
      requireAuth: true,
      rolNecesario: "ADMIN"
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
router.beforeEach((to, from, next) => {
  const authStore = useAuth();

  const { token, rol } = authStore.$state;
  const isAuth = token.length > 0;

  const { requireAuth, rolNecesario } = to.meta;
  const requiereAdmin = rolNecesario === "ADMIN";

  if (requireAuth && !isAuth) {
    next('/autenticacion');
    return;
  }

  if (requiereAdmin && rol !== "ADMIN") {
    next('/documentos');
    return;
  }

  next();
});
