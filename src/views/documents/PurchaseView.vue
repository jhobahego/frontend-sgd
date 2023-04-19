<template>
  <section class="purchase__container">
    <header class="purchase__info">
      <h1 class="purchase__title">Tener en cuenta!</h1>
      <p class="purchase__description">
        No se puede prestar mas de un documento por persona
      </p>
      <p class="purchase__description">
        No se puede comprar mas documentos de los que hay disponibles
      </p>
    </header>
    <PurchaseForm />
  </section>
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

<style>
@import url(purchaseView.css);
</style>