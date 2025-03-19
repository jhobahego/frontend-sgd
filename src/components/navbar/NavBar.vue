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
        <router-link class="navbar__link" :to="{ name: 'admin' }" @click="cerrarMenu">Admin
        </router-link>
      </li>
      <!-- <li class="navbar__item" v-if="autenticado && isAdmin">
        <router-link class="navbar__link" :to="{ name: 'usuarios' }" @click="cerrarMenu">usuarios
        </router-link>
      </li>
      <li class="navbar__item" v-if="autenticado && isAdmin">
        <router-link class="navbar__link" :to="{ name: 'AllDocumentsAdmin' }" @click="cerrarMenu">Manejo de
          documentos</router-link>
      </li> -->
      <li class="navbar__item">
        <router-link class="navbar__link" :to="{ name: 'about' }" @click="cerrarMenu">Acerca de</router-link>
      </li>

      <li class="navbar__item">
        <div class="search-container">
          <BusquedaSemantica />
        </div>
      </li>

      <router-link class="navbar__btn navbar__btn--link" :to="{ name: 'authView' }" v-if="!autenticado"
        @click="cerrarMenu">Iniciar sesión</router-link>
      <button class="navbar__btn" @click.prevent="cerrarSesion()" v-if="autenticado">Cerrar sesión</button>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, watch, computed, ref } from 'vue';
import { useAuth } from '@/store/authStore';
import BusquedaSemantica from '@/components/search/BusquedaSemantica.vue';

export default defineComponent({
  name: "showNavegation",
  data() {
    return {
      isNavVisible: false,
      autenticado: false,
      isAdmin: false
    };
  },

  components: {
    BusquedaSemantica
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
</script>

<style scoped>
@import url(styles.css);
</style>