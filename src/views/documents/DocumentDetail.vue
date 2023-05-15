<template>
  <h2 class="title" v-if="Object.keys(documento).length === 0">No existe este documento</h2>
  <section class="document__container" v-else>
    <Document_detail :documento="documento" />
  </section>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Document } from '@/interfaces/Document';
import { obtenerDocumento } from '@/services/DocumentService'
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

      const response = await obtenerDocumento(documento_id);

      if (response) {
        this.documento = response;
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

  // computed: {
  //   mensaje() {
  //     return Object.keys(this.documento).length === 0;
  //   },
  // },
})
</script>

<style>
@import url(detail.css);
</style>