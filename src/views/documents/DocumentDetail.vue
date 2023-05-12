<template>
  <section class="document__container">
    <Document_detail :documento="documento" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Document } from '@/interfaces/Document';
import { obtenerDocumento } from '@/services/DocumentService'
import { obtenerTokenDeLocalStorage } from '@/services/Utils';
import Document_detail from '@/components/document/Document_detail.vue';

export default defineComponent({
  name: 'documentDetalView',

  data() {
    return {
      documento: {} as Document,
    }
  },

  components: {
    Document_detail,
  },

  methods: {
    async verDocumento() {
      const documento_id = this.$route.params.id;
      const token = obtenerTokenDeLocalStorage();
      if (token == null) return this.$router.push("/autenticado");

      const response = await obtenerDocumento(documento_id, token);

      if (response) {
        this.documento = response.data
      }
    },

    adquirir() {
      this.$router.push(`/documentos/comprar/${this.documento._id}`);
    },

    cancelar() {
      this.$router.push("/documentos");
    },
  },

  created() {
    this.verDocumento();
  },
})
</script>

<style>
@import url(detail.css);
</style>