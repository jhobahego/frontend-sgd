<template>
  <h2 class="title" v-if="Object.keys(documento).length === 0">No existe este documento</h2>
  <section class="document__container" v-else>
    <Document_detail :documento="documento" />
  </section>
  <notifications position="bottom right" animation-type="css" width="50vw" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Documento } from '@/interfaces/Documento';
import { obtenerDocumento } from '@/services/DocumentService'
import Document_detail from '@/components/document/Document_detail.vue';

export default defineComponent({
  name: 'documentDetail',

  data() {
    return {
      documento: {} as Documento,
    }
  },

  components: {
    Document_detail,
  },

  methods: {
    async verDocumento() {
      const documento_id = this.$route.params.id;

      const { data } = await obtenerDocumento(documento_id);
      this.documento = data;
    },

    adquirir() {
      this.$router.push(`/documentos/comprar/${this.documento._id}`);
    },
  },

  created() {
    this.verDocumento();
  },
})
</script>

<style scoped>
@import url(detail.css);
</style>