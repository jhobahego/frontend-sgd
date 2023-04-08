<template>
  <nav class="navbar" :class="{ 'navbar__opacity': isNavVisible }">
    <div class="navbar__header">
      <router-link class="navbar__brand" to="/">Inicio</router-link>
      <button class="navbar__toggle" @click="toggleNav">☰</button>
    </div>
    <ul class="navbar__items" :class="{ 'navbar__items--visible' : isNavVisible }">
      <li class="navbar__item navbar__item--first">
        <router-link class="navbar__link" to="/documentos">Documentos</router-link>
      </li>
      <li class="navbar__item">
        <router-link class="navbar__link" to="/about">Acerca de</router-link>
      </li>
      <li class="navbar__item">
        <router-link class="navbar__link" to="#">Iniciar sesión</router-link>
      </li>

      <li class="navbar__item">
        <router-link class="navbar__link" to="#">Registrarse</router-link>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "showNavegation",
  data() {
    return {
      isNavVisible: false
    };
  },
  methods: {
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    }
  }
})
</script>

<style>
@import url(styles.css);
</style>