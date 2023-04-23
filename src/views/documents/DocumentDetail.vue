<template>
  <section class="document__container">
    <article class="document__card">
      <figure class="img__container">
        <img class="document__img" src="@/assets/libro.jpeg" alt="libro the pragmatic programmer">
      </figure>

      <div class="document__info">
        <h3 class="document__title">{{ documento.titulo }}</h3>
        <p class="document__description">
          {{ documento.descripcion }}
        </p>
        <p class="document__description">
          precio: {{ documento.precio }}$
        </p>
        <p class="document__description">
          stock: {{ documento.stock }}
        </p>
        <p class="document__description">
          autor: {{ documento.autor }}
        </p>
        <p class="document__description">
          idioma: {{ documento.idioma }}
        </p>
        <button class="buy__btn" @click.prevent="adquirir()">adquirir</button>
      </div>

    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Document } from '@/interfaces/Document';
import { obtenerDocumento } from '@/services/DocumentService'
import { obtenerTokenDeLocalStorage } from '@/services/Utils';

export default defineComponent({
  name: 'documentDetalView',

  data() {
    return {
      documento: {} as Document,
    }
  },

  methods: {
    async verDocumento() {
      const documento_id = this.$route.params.id;
      const token = obtenerTokenDeLocalStorage();
      if(token == null) return this.$router.push("/autenticado");

      const response = await obtenerDocumento(documento_id, token);

      if(response){
        this.documento = response.data
      }
    },

    adquirir() {
      this.$router.push(`/documentos/comprar/${this.documento._id}`);
    },
  },

  created() {
    this.verDocumento();
  },
})
</script>

<style>
@import url(detail.css);
</style>