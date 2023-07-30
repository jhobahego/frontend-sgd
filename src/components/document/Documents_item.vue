<template>
  <article class="card">
    <figure class="img__container">
      <img class="document__img" :src="documento.imagen" :alt="documento.titulo" />
    </figure>
    <div class="card__body">
      <h3 class="card__title">{{ documento.titulo }}</h3>
      <p class="card__description">{{ documento.descripcion }}</p>
      <button class="card__btn" @click.prevent="verMas(documento._id)">
        Ver mas
      </button>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Documento } from '@/interfaces/Documento';

export default defineComponent({
  props: {
    documento: {
      type: Object as () => Documento,
      required: true,
    }
  },

  methods: {
    verMas(documento_id: string | undefined) {
      if (documento_id) {
        this.$router.push(`/documento/${documento_id}`);
      }
    },
  }
})
</script>

<style scoped>
@import url(documentItem.css);
</style>