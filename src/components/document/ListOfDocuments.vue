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
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
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
    const documentosLimitados = computed(() => {
      if (props.limite && props.documentos.length > props.limite) {
        return props.documentos.slice(0, props.limite);
      }

      return props.documentos;
    });

    return {
      documentosLimitados
    };
  }
})

</script>

<style scoped>
@import url(listOfDocuments.css);

.lista {
  padding: .2em 0;
}
</style>