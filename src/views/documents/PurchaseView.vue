<template>
  <header class="info">
    <h1 class="info__title">Tener en cuenta!</h1>
    <p class="info__descripcion">
      No se puede prestar mas de un documento por persona
    </p>
    <p class="info__descripcion">
      No se puede comprar mas documentos de los que hay disponibles
    </p>
  </header>
  <PurchaseForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PurchaseForm  from '@/components/forms/PurchaseForm.vue'

export default defineComponent({
  name: "purchaseView",
  components: {
    PurchaseForm,
  },
})
</script>