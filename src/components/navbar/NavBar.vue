<template>
  <nav class="navbar" :class="{ 'navbar__opacity': isNavVisible }">
    <div class="navbar__header">
      <router-link class="navbar__brand" :to="{ name: 'home' }">Inicio</router-link>
      <button class="navbar__toggle" @click="toggleNav">☰</button>
    </div>
    <ul class="navbar__items" :class="{ 'navbar__items--visible': isNavVisible }">
      <li class="navbar__item navbar__item--first" v-if="autenticado">
        <router-link class="navbar__link" :to="{ name: 'documentsView' }" @click="cerrarMenu">Documentos</router-link>
      </li>
      <li class="navbar__item" v-if="autenticado && isAdmin">
        <router-link class="navbar__link" :to="{ name: 'documentFormView' }" @click="cerrarMenu">Registrar
          documento</router-link>
      </li>
      <li class="navbar__item">
        <router-link class="navbar__link" :to="{ name: 'about' }" @click="cerrarMenu">Acerca de</router-link>
      </li>

      <router-link class="navbar__btn navbar__btn--link" :to="{ name: 'authView' }" v-if="!autenticado"
        @click="cerrarMenu">Iniciar sesión</router-link>
      <button class="navbar__btn" @click.prevent="cerrarSesion()" v-if="autenticado">Cerrar sesión</button>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useAuth } from '@/store/authStore';

export default defineComponent({
  name: "showNavegation",
  data() {
    return {
      isNavVisible: false,
      autenticado: false,
      isAdmin: false
    };
  },

  methods: {
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    },

    verificarSesion() {
      const store = useAuth();

      const actualizarAutenticado = (nuevoValor: string) => {
        this.autenticado = nuevoValor.length > 0;
      };

      const actualizarIsAdmin = (nuevoValor: string) => {
        this.isAdmin = nuevoValor === "ADMIN";
      };

      watch(() => store.token, actualizarAutenticado);
      watch(() => store.rol, actualizarIsAdmin);

      // Actualizar las propiedades inicialmente
      actualizarAutenticado(store.token);
      actualizarIsAdmin(store.rol);
    },

    cerrarSesion() {
      this.cerrarMenu();

      const store = useAuth();
      store.logout();

      this.autenticado = false;
      this.$router.push("/autenticacion");
    },

    cerrarMenu() {
      this.isNavVisible = !this.isNavVisible;
    },
  },

  created() {
    this.verificarSesion();
  },
});


// export default defineComponent({
//   name: "showNavegation",
//   data() {
//     return {
//       isNavVisible: false,
//       autenticado: false,
//       isAdmin: false
//     };
//   },

//   methods: {
//     toggleNav() {
//       this.isNavVisible = !this.isNavVisible;
//     },

//     async verificarSesion() {
//       const store = useAuth();

//       const token = store.token;
//       const rol = store.rol;

//       this.$watch(
//         () => store.token,
//         (nuevoValor) => {
//           this.autenticado = nuevoValor.length > 0;
//         }
//       )

//       this.$watch(
//         () => store.rol,
//         (nuevoValor) => {
//           this.isAdmin = nuevoValor === "ADMIN";
//         }
//       )

//       this.isAdmin = rol === "ADMIN";
//       this.autenticado = token.length > 0;
//     },

//     cerrarSesion() {
//       this.cerrarMenu();

//       const store = useAuth();
//       store.logout();

//       this.autenticado = false;
//       this.$router.push("/autenticacion");
//     },

//     cerrarMenu() {
//       this.isNavVisible = !this.isNavVisible;
//     },
//   },

//   created() {
//     this.verificarSesion();
//   },
// })
// </script>

<style scoped>
@import url(styles.css);
</style>