<template>
  <header class="documents__manage">
    <h1 class="title">Gestionar documentos</h1>
    <form class="documentsCreate__form">
      <label class="documents__searchlabel">
        buscar por
        <select class="documents__searchtype" v-model="tipoDeBusqueda">
          <option value="titulo">titulo</option>
          <option value="categoria">categoria</option>
          <!-- <option value="precio">precio</option> -->
          <option value="idioma">idioma</option>
        </select>
      </label>
      <label class="documents__searchlabel">
        buscar
        <input type="text" class="documents__searchinput" placeholder="clean code, head first java..." v-model="busqueda">
      </label>
      <button class="search__btn">buscar</button>
    </form>
    <router-link class="createDocument__btn" :to="{ name: 'documentFormView' }">Crear documento</router-link>
  </header>

  <h3 class="list__title">Listado de documentos</h3>
  <ul class="documents__info">
    <li class="document__item" v-for="documento in documentos" :key="documento._id">
      <router-link class="document__title" :to="{ name: 'DocumentDetailAdmin', params: { id: documento._id } }">{{
        documento.titulo }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue';
import { Documento } from '@/interfaces/Documento';
import { obtenerDocumentos } from '@/services/DocumentService';

const documentos: Ref<Documento[]> = ref([]);
const busqueda: Ref<string> = ref('');
const tipoDeBusqueda: Ref<string> = ref('titulo');

onMounted(async () => {
  documentos.value = await obtenerDocumentos();
})
</script>

<style scoped>
@import url(allDocumentsView.css);
</style>