<template>
  <section class="card__container">
    
    <div v-for="documento in documentos" :key="documento._id">
      <article class="card card--out" v-if="documento.stock < 1">
      <h1 class="card__title">{{ documento.titulo }}</h1>
      <div class="card-body">
        <p class="card__description">Libro agotado pronto tendremos mas!!!</p>
      </div>
    </article>

    <article class="card" v-else>
      <figure class="img__container">
        <img class="document__img" src="../../assets/libro.jpeg" alt="libro the pragmatic programmer" />
      </figure>
      <div class="card__body">
        <h3 class="card__title">{{documento.titulo}}</h3>
        <p class="card__description">{{ documento.descripcion }}</p>
        <button class="card__btn" @click.prevent="verMas(documento._id)">
          Ver mas
        </button>
      </div>
    </article>
    </div>

  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Document } from '@/interfaces/Document';
import { obtenerDocumentos } from '@/services/DocumentService'

export default defineComponent({
  name: "DocumentView",

  data() {
    return {
      documentos: {} as Document[]
    }
  },
  
  methods: {
    async cargarDocumentos() {
      const token = localStorage.getItem("token");
      if(token === null) return this.$router.push("/autenticacion");

      const res = await obtenerDocumentos(token);
      if(res){
        this.documentos = res?.data;
      }
    },
    verMas(document_id: string | undefined) {
      if(document_id){
        this.$router.push(`/documento/${document_id}`);
      }
    },
  },

  created() {
    this.cargarDocumentos();
  },
});
</script>

<style>
@import url(styles.css);
</style>