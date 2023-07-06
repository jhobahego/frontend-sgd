<template>
  <article style="padding: .4em 2em">
    <header style="display: flex; align-items: center; justify-content: space-between;">
      <h2>{{ titulo }}</h2>
      <router-link class="navbar__link" :to="{ name: 'AllDocumentsAdmin' }">Manejo de
        documentos</router-link>
      </header>
      <ul class="lista" v-for="documento in documentosLimitados" :key="documento._id">
        <li class="item-lista">
          <h4>{{ documento.titulo }}</h4>
          <p>{{ documento.descripcion }}</p>
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
.lista {
  padding: .2em 0;
}
</style>