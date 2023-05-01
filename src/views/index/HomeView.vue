<template>
  <section class="home">
    <div class="records" v-if="autenticado">
      <header class="title__container">
        <h1 class="welcome">Bienvenido {{ username }}</h1>
        <h2 class="title">Tu galeria de documentos</h2>
      </header>
      <article class="records__description" v-for="registro in registros" :key="registro.registro_id">
        <h3 class="record__title">{{ registro.titulo_documento }}</h3>      
        <p class="record__type">{{ registro.tipo_de_adquisicion }}</p>
        <p class="record__status">{{ registro.activo }}</p>
      </article>
    </div>
    <header class="content" v-if="!autenticado">
      <h1 class="title">Sistema de gestión documental</h1>
      <router-link to="/autenticacion" class="sesion">Iniciar sesion</router-link>
    </header>
  </section>
</template>

<script lang="ts">
import { Registro } from '@/interfaces/Registro';
import { obtenerUsuarioAutenticado } from '@/services/AuthService';
import { obtenerComprasDeUsuario } from '@/services/Purchase';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  
  data() {
    return {
      username: "",
      autenticado: false,
      registros: [] as Registro[],
    }
  },

  methods: {
    async obtenerUsuario() {
      const usuario = await obtenerUsuarioAutenticado();
      if(usuario === undefined) {
        return this.autenticado = false;
      } else {
        const registro = await obtenerComprasDeUsuario(usuario);
        if(registro) this.registros = registro;
  
        this.autenticado = true;
        this.username = usuario.nombres;
      }
      
    },
  },

  created() {
    this.obtenerUsuario();  
  }
});
</script>


<style>
@import url(styles.css);
</style>
