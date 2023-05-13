<template>
  <section class="card__container">
    <h2 v-if="documentos.length < 0">No hay documentos disponibles de momento</h2>

    <div v-for="documento in documentos" :key="documento._id" v-else>e>
      <Documents_item :documento="documento" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Document } from '@/interfaces/Document';
import { obtenerDocumentos } from '@/services/DocumentService'
import Documents_item from '@/components/document/Documents_item.vue';

export default defineComponent({
  name: "DocumentView",
  data() {
    return {
      documentos: {} as Document[]
    };
  },
  methods: {
    async cargarDocumentos() {
      this.documentos = await obtenerDocumentos();
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