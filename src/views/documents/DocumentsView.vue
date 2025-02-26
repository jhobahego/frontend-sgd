<template>
  <section class="card__container">
    <div v-if="documentosDisponibles.length === 0" class="empty-state">
      <h2>No hay documentos disponibles</h2>
      <p>En este momento no hay documentos disponibles para mostrar.</p>
    </div>

    <div v-else v-for="documento in documentosDisponibles" :key="documento._id">
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
      documentosDisponibles: [] as Documento[]
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

<style scoped>
@import url(styles.css);
</style>