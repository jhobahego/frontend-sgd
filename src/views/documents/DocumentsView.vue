<template>
  <section class="card__container">
    <h2 v-if="documentosDisponibles.length < 0">No hay documentos disponibles de momento</h2>

    <div v-for="documento in documentosDisponibles" :key="documento._id" v-else>
      <Documents_item :documento="documento" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Documento } from '@/interfaces/Documento';
import { obtenerDocumentos } from '@/services/DocumentService'
import Documents_item from '@/components/document/Documents_item.vue';

export default defineComponent({
  name: "DocumentView",
  data() {
    return {
      documentosDisponibles: {} as Documento[]
    };
  },
  methods: {
    async cargarDocumentos() {
      const documentos = await obtenerDocumentos();
      this.documentosDisponibles = documentos.filter(documento => documento.stock > 0);
    },
  },
  created() {
    this.cargarDocumentos();
  },
  components: {
    Documents_item,
  }
});
</script>

<style>
@import url(styles.css);
</style>