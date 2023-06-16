<template>
  <h1 class="title">Gestionar documentos</h1>
  <ul class="documents__info">
    <li class="document__item" v-for="documento in documentos" :key="documento._id">
      <router-link class="document__title" :to="{ name: 'DocumentDetailAdmin', params: { id: documento._id } }">{{ documento.titulo }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue';
import { Documento } from '@/interfaces/Documento';
import { obtenerDocumentos } from '@/services/DocumentService';

const documentos: Ref<Documento[]> = ref([]);

onMounted(async () => {
  documentos.value = await obtenerDocumentos();
})
</script>

<style scoped>
</style>