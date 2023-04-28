<template>
  <nav class="navbar" :class="{ 'navbar__opacity': isNavVisible }">
    <div class="navbar__header">
      <router-link class="navbar__brand" to="/">Inicio</router-link>
      <button class="navbar__toggle" @click="toggleNav">☰</button>
    </div>
    <ul class="navbar__items" :class="{ 'navbar__items--visible': isNavVisible }">
      <li class="navbar__item navbar__item--first" v-if="autenticado">
        <router-link class="navbar__link" to="/documentos" @click="cerrarMenu">Documentos</router-link>
      </li>
      <li class="navbar__item">
        <router-link class="navbar__link" to="/about" @click="cerrarMenu">Acerca de</router-link>
      </li>

      <router-link class="navbar__btn navbar__btn--link" to="/autenticacion" v-if="!autenticado"
        @click="cerrarMenu">Iniciar sesión</router-link>
      <button class="navbar__btn" @click.prevent="cerrarSesion()" v-if="autenticado">Cerrar sesión</button>
    </ul>
  </nav>
</template>
<script lang="ts">
import { obtenerUsuarioAutenticado } from '@/services/AuthService';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "showNavegation",
  data() {
    return {
      isNavVisible: false,
      autenticado: false
    };
  },

  methods: {
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    },

    async obtenerUsuario() {
      const usuario = await obtenerUsuarioAutenticado();
      if (usuario === undefined) return this.autenticado = false;

      this.autenticado = true;
    },

    cerrarSesion() {
      this.cerrarMenu();
      localStorage.removeItem("token");
      this.autenticado = false;
      this.$router.push("/autenticacion");
    },

    cerrarMenu() {
      this.isNavVisible = !this.isNavVisible;
    },
  },

  created() {
    this.obtenerUsuario();
  },

  watch: {
    $route: "obtenerUsuario",
  },
})
</script>

<style>
@import url(styles.css);
</style>