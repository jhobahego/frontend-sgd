<template>
  <section class="purchase__container">
    <header class="purchase__info">
      <h1 class="purchase__title">Tener en cuenta!</h1>

      <div class="desc__container">
        <p class="purchase__description">
          No se puede prestar mas de un documento por persona
        </p>
        <p class="purchase__description">
          No se puede comprar mas documentos de los que hay disponibles
        </p>
      </div>
    </header>
    <PurchaseForm :documento="documento" />
  </section>
  <notifications position="bottom right" animation-type="css" width="50vw" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PurchaseForm from '@/components/forms/PurchaseForm.vue'
import { obtenerDocumento } from '@/services/DocumentService';
import { Documento } from '@/interfaces/Documento';

export default defineComponent({
  name: "purchaseView",

  data() {
    return {
      documento: {} as Documento,
    }
  },

  components: {
    PurchaseForm,
  },

  methods: {
    async obtenerDocumentoDeLaApi() {
      const documento_id = this.$route.params.id;
      const { success, body, message } = await obtenerDocumento(documento_id);

      if (!success) {
        this.$notify({
          title: "Fallo al editar",
          text: `${message}`,
          type: "error",
          duration: 3000,
        })
        return;
      }
      this.documento = body;
    },
  },

  created() {
    this.obtenerDocumentoDeLaApi();
  },
})
</script>

<style>
@import url(purchaseView.css);
</style>