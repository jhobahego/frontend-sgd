<template>
  <div id="showNavegation">
    <nav class="navbar">
      <router-link class="navbar__brand" to="/">Inicio</router-link>
      <ul class="navbar__items">
        <li class="navbar__item">
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
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "showNavegation",
})
</script>

<style>
@import url(styles.css);
</style>