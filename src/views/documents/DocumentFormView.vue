<template>
  <section class="form__container">
    <h1 class="form__title">Crea tu documento</h1>
    <DocumentForm />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DocumentForm from '@/components/document/DocumentForm.vue';

export default defineComponent({
  name: "DocumentFormView",
  components: {
    DocumentForm,
  }
})
</script>

<style scoped>
@import url(formView.css);
</style>