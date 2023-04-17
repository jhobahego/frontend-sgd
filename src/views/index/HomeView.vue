<template>
  <section class="home">
    <header class="title__container" v-if="autenticado">
      <h1 class="welcome">Bienvenido {{ username }}</h1>
      <h2 class="title">Tu galeria de documentos</h2>
    </header>
    <header class="content" v-else>
      <h1 class="title">Sistema de gestión documental</h1>
      <router-link to="/autenticacion" class="sesion">Iniciar sesion</router-link>
    </header>
  </section>
</template>

<script lang="ts">
import { obtenerUsuarioAutenticado } from '@/services/AuthService';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  
  data() {
    return {
      username: "",
      autenticado: false,
    }
  },

  methods: {
    async obtenerUsuario() {
      const token = localStorage.getItem("token");
      if(token == null) return this.autenticado = false

      const usuario = await obtenerUsuarioAutenticado(token);
      if(usuario === undefined) return this.autenticado = false
      
      this.autenticado = true
      this.username = usuario.data.nombres
    }
  },

  created() {
    this.obtenerUsuario();  
  }
});
</script>


<style>
@import url(styles.css);
</style>
