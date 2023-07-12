<template>
  <article class="list__documents">
    <header class="documentlist__header">
      <h2 class="documentlist__title">{{ titulo }}</h2>
      <router-link class="documentlist__link" :to="{ name: 'AllDocumentsAdmin' }">Manejo de
        documentos</router-link>
    </header>
    <ul class="documentslist" v-for="documento in documentosLimitados" :key="documento._id">
      <li class="documentslist__item">
        <h4 class="item__title">{{ documento.titulo }}</h4>
        <p class="item__description">{{ documento.descripcion }}</p>
        <button class="item__details" @click="verDetalle(documento._id)">Ver mas detalles</button>
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Documento } from '@/interfaces/Documento';

export default defineComponent({
  props: {
    titulo: {
      type: String,
      require: true
    },
    documentos: {
      type: Array as () => Documento[],
      required: true
    },
    limite: {
      type: Number,
      require: false
    }
  },

  setup(props) {
    const router = useRouter();

    const verDetalle = (documento_id: string | undefined) => {
      if (documento_id != undefined) {
        router.push({ name: 'documentDetail', params: { id: documento_id } });
      }
    }

    const documentosLimitados = computed(() => {
      if (props.limite && props.documentos.length > props.limite) {
        return props.documentos.slice(0, props.limite);
      }

      return props.documentos;
    });

    return {
      documentosLimitados,
      verDetalle
    };
  }
})

</script>

<style scoped>
@import url(listOfDocuments.css);
</style>