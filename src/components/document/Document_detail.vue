<template>
  <article class="document__card">
    <figure class="img__container">
      <img class="document__img" :src="documento.imagen" :alt="documento.titulo">
    </figure>
    <div class="document__info">
      <p class="document__description">{{ documento.descripcion }}</p>
      <p class="document__description">
        precio: {{ documento.precio }}$
      </p>
      <p class="document__description">
        stock: {{ documento.stock }}
      </p>
      <p class="document__description">
        idioma: {{ documento.idioma }}
      </p>
      <button class="buy__btn" @click.prevent="adquirir()">adquirir</button>
      <CancelBtn text="Cancelar" :redirect="{ name: 'documentsView' }" />
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Documento } from '@/interfaces/Documento';
import CancelBtn from '@/components/botones/CancelBtn.vue'

export default defineComponent({
  props: {
    documento: {
      type: Object as () => Documento,
      required: true,
    }
  },

  components: {
    CancelBtn
  },

  methods: {
    adquirir() {
      this.$router.push(`/documentos/comprar/${this.documento._id}`);
    },
  }
})
</script>

<style scoped>
@import url(documentDetail.css);
</style>