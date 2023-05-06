<template>
  <section class="home">
    <div class="records" v-if="autenticado">

      <header class="title__container">
        <h1 class="welcome">Bienvenido {{ username }}</h1>
        <h2 class="title">Tu galeria de documentos</h2>
      </header>

      <section class="records__container">
        <article class="record__items" v-for="registro in registros" :key="registro.registro_id">
          <img src="../../assets/libro.jpeg" alt="imagen del libro">
          <div class="record__info">
            <h4 class="record__title">{{ registro.titulo_documento }}</h4>
            <p class="record__description">{{ registro.tipo_de_adquisicion }}</p>
            <p class="record__description">Documentos adquiridos: {{ registro.cantidad }}</p>
          </div>
        </article>
      </section>

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
import { normalizarRegistros } from '@/services/Utils'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',

  data() {
    return {
      username: "",
      autenticado: false,
      esCompra: false,
      registros: [] as Registro[],
    }
  },

  methods: {
    async obtenerUsuario() {
      const usuario = await obtenerUsuarioAutenticado();
      if (usuario === undefined) {
        this.autenticado = false;
        return;
      }

      const registro = await obtenerComprasDeUsuario(usuario);
      if (!registro) return;

      const registrosUnicos = normalizarRegistros(registro);
      if (registrosUnicos) {
        this.registros = registrosUnicos;
      }

      this.autenticado = true;
      this.username = usuario.nombres;
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
