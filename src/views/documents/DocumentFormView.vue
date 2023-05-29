<template>
  <section>
    <h1 class="title">Crea tu documento</h1>
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
h1 {
  margin: 1em 0 .4em;
}

section {
  margin-left: 4em;
  margin-right: 4em;
}
</style>