<template>
  <section class="card__container">

    <div v-for="documento in documentos" :key="documento._id">
      <article class="card card--out" v-if="documento.stock < 1">
        <h1 class="card__title">{{ documento.titulo }}</h1>
        <div class="card-body">
          <p class="card__description">Libro agotado pronto tendremos mas!!!</p>
        </div>
      </article>

      <Documents_item :documento="documento" v-else />
    </div>

  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Document } from '@/interfaces/Document';
import { obtenerDocumentos } from '@/services/DocumentService'
import Documents_item from '@/components/document/Documents_item.vue';

export default defineComponent({
  name: "DocumentView",
  data() {
    return {
      documentos: {} as Document[]
    };
  },
  methods: {
    async cargarDocumentos() {
      const token = localStorage.getItem("token");
      if (token === null)
        return this.$router.push("/autenticacion");
      const res = await obtenerDocumentos(token);
      if (res) {
        this.documentos = res?.data;
      }
    },
  },
  created() {
    this.cargarDocumentos();
  },
  components: {
    Documents_item,
  }
});
</script>

<style>
@import url(styles.css);
</style>