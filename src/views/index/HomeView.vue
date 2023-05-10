<template>
  <section class="home">
    <notifications position="top right" animation-type="css" width="400px" :classes="tipoNotificacion"/>
    <header class="title__container" v-if="autenticado">
      <!-- <h1 class="welcome">Bienvenido {{ username }}</h1> -->
      <h2 class="title">Tu galeria de documentos</h2>
    </header>
    <div class="records" v-if="autenticado">

      <!-- <section class="records__container"> -->
        <article class="record__items" v-for="registro in registros" :key="registro.registro_id">
          <img :src="registro.imagen" :alt="registro.titulo_documento">
          <div class="record__info">
            <h4 class="record__title">{{ registro.titulo_documento }}</h4>
            <p class="record__description">{{ registro.tipo_de_adquisicion }}</p>
            <p class="record__description">Documentos adquiridos: {{ registro.cantidad }}</p>
          </div>
        </article>
      <!-- </section> -->

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
import { notify } from '@kyvg/vue3-notification';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',

  data() {
    return {
      username: "",
      autenticado: false,
      esCompra: false,
      registros: [] as Registro[],
      tipoNotificacion: "",
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
      this.tipoNotificacion = "notify__topright--success";

      notify({
        title: "Sesión iniciada",
        text: `Bienvenido ${this.username}, has iniciado sesión correctamente`,
        duration: 4000,
      })
    },
  },

  created() {
    this.obtenerUsuario();
  }
});
</script>


<style>
@import url(home.css);
</style>
