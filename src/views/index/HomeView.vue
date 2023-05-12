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

    <div class="records" v-if="autenticado">
      <Documents_adquired :registros="registros" />
    </div>
  </section>
</template>

<script lang="ts">
import { Registro } from '@/interfaces/Registro';
import { obtenerUsuarioAutenticado } from '@/services/AuthService';
import { obtenerComprasDeUsuario } from '@/services/Purchase';
import { normalizarRegistros } from '@/services/Utils'
import { defineComponent } from 'vue';
import Documents_adquired from '@/components/document/Documents_adquired.vue';

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

  components: {
    Documents_adquired,
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
@import url(home.css);
</style>
