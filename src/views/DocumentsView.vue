<template>
  <div id="verDocumento">
    <div class="card card-body mx-auto" style="width: 26rem">
      <img src="../assets/libro.jpeg" alt="libro the pragmatic programmer" class="card-img-top mb-2" />
      <div class="card-text border border-radius-4 p-2 bg-light">
        <h3 class="card-title">The pragmatic programmer</h3>
        <p class="text-muted">From journey to mastery</p>
        <p>Autor: Jhon hernandez</p>
        <p>quedan 25 documentos, precio: 40$</p>
      </div>
      <button class="btn btn-primary my-2" @click.prevent="adquirir()">
        Adquirir
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "DocumentView",
  methods: {
    adquirir() {
      alert("Opciones de compra...");
    }
  }
});
</script>
