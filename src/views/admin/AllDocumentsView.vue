<template>
  <header class="documents__manage">
    <h1 class="title">Gestionar documentos</h1>
    <form class="documentsCreate__form">
      <router-link class="createDocument__btn" :to="{ name: 'documentFormView' }">Crear documento</router-link>
      <label class="documents__searchlabel">
        Filtrar por
        <select class="type__select" v-model="tipoDeBusqueda">
          <option value="titulo">titulo</option>
          <option value="categoria">categoria</option>
          <!-- <option value="precio">precio</option> -->
          <option value="idioma">idioma</option>
        </select>
      </label>

      <label class="documents__searchlabel" v-if="categoria">
        categoria:
        <select class="documents__searchinput" v-model="busqueda">
          <option value="desarrollo de software">desarrollo de software</option>
          <option value="deportes">deportes</option>
          <option value="contaduria">contaduria</option>
          <option value="romantico">romantico</option>
          <option value="comics">comics</option>
          <option value="anime">anime</option>
        </select>
      </label>

      <label class="documents__searchlabel" v-else-if="idioma">
        idioma:
        <select class="documents__searchinput" v-model="busqueda">
          <option value="ingles">ingles</option>
          <option value="español">español</option>
        </select>
      </label>

      <label class="documents__searchlabel" v-else>
        Buscar
        <input type="text" class="documents__searchinput" placeholder="clean code, head first java..." v-model="busqueda">
      </label>
    </form>
  </header>

  <h3 v-show="documentosFiltrados.length > 0" class="list__title">{{ mensaje }}</h3>
  <h3 v-show="documentosFiltrados.length === 0" class="list__title">{{ mensaje }}</h3>
  <ul class="documents__info">
    <li class="document__item" v-for="documento in documentosFiltrados" :key="documento._id">
      <router-link class="document__title" :to="{ name: 'DocumentDetailAdmin', params: { id: documento._id } }">{{
        documento.titulo }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted, computed, watch } from 'vue';
import { Documento } from '@/interfaces/Documento';
import { obtenerDocumentos } from '@/services/DocumentService';

const documentos: Ref<Documento[]> = ref([]);
const busqueda: Ref<string> = ref('');
const tipoDeBusqueda: Ref<string> = ref('titulo');

const idioma = computed(() => {
  return tipoDeBusqueda.value === "idioma";
})

const categoria = computed(() => {
  return tipoDeBusqueda.value === "categoria";
})

const documentosFiltrados: Ref<Documento[]> = ref([]);

const mensaje = computed(() => {
  if (documentosFiltrados.value.length === 0) {
    return "No se han encontrado documentos";
  }
  return "Listado de documentos";
})

function seleccionarCriterio(): void {
  const tipo = tipoDeBusqueda.value;
  if (tipo === "idioma") {
    busqueda.value = "español";
  } else if (tipo === "categoria") {
    busqueda.value = "desarrollo de software";
  } else {
    busqueda.value = "";
  }
}

function filtro() {
  documentosFiltrados.value = documentos.value;

  const tipo = tipoDeBusqueda.value;
  if (tipo === "idioma") {
    documentosFiltrados.value = documentos.value.filter((documento) => documento.idioma === busqueda.value);
  } else if (tipo === "categoria") {
    documentosFiltrados.value = documentos.value.filter((documento) => documento.categoria === busqueda.value);
  } else {
    documentosFiltrados.value = documentos.value.filter((documento) => documento.titulo.toLowerCase().includes(busqueda.value.toLowerCase()));
  }

  if (documentos.value.length === 0) {
    console.log({ message: "No se han encontrado documentos" });
  }
}

watch(tipoDeBusqueda, seleccionarCriterio);
watch(busqueda, filtro);

onMounted(async () => {
  documentos.value = await obtenerDocumentos();
  documentosFiltrados.value = documentos.value;
})
</script>

<style scoped>
@import url(allDocumentsView.css);
</style>