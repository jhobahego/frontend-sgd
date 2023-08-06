<template>
  <section class="home">
    <header class="title__container" v-if="autenticado">
      <h1 class="welcome">Bienvenido {{ username }}</h1>
      <h2 class="title" v-if="registros.length > 0">Tu galeria de documentos</h2>
      <h2 class="title" v-else>No has adquirido ningun documento</h2>
    </header>

    <header class="content" v-else>
      <h1 class="title">Sistema de gestión documental</h1>
      <router-link to="/autenticacion" class="sesion">Iniciar sesion</router-link>
    </header>

    <div class="records" v-if="autenticado">
      <Documents_adquired :registros="registros" />
    </div>
    <notifications position="top right" animation-type="css" style="margin-top: 4em;" />
  </section>
</template>

<script lang="ts">
import { Registro } from '@/interfaces/Registro';
import { normalizarRegistros } from '@/services/Utils'
import { defineComponent } from 'vue';
import Documents_adquired from '@/components/document/Documents_adquired.vue';
import { useAuth } from '@/store/authStore';
import { useRecord } from '@/store/recordsStore';

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
      const store = useAuth();
      const recordStore = useRecord();

      const { usuario, hasError } = store;
      this.autenticado = store.token.length > 0;

      if (hasError) return;

      this.username = usuario.nombres;

      await recordStore.obtenerRegistros();
      const registro = recordStore.registros;

      if (registro.length === 0) return;

      const registrosUnicos = normalizarRegistros(registro);
      this.registros = registrosUnicos ?? [];
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
