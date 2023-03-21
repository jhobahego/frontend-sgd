<template>
  <div id="showNavegation">
    <nav class="navbar navbar-expand-sm bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Inicio</router-link>
        <div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" to="/documentos">Documentos</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/about">Acerca de</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="#">Iniciar sesión</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="#">Registrarse</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "showNavegation",
})
</script>