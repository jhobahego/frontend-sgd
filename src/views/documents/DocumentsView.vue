<template>
  <section class="card__container">
    <article class="card">
      <figure class="img__container">
        <img class="card__img" src="../../assets/libro.jpeg" alt="libro the pragmatic programmer" />
      </figure>
      <div class="card__body">
        <h3 class="card__title">The pragmatic programmer</h3>
        <p class="card__description">From journey to mastery</p>
        <p class="card__description">Autor: Jhon hernandez</p>
        <p class="card__description">Precio: 40$</p>
        <p class="card__description">quedan 25 documentos</p>

        <button class="card__btn" @click.prevent="adquirir()">
          Adquirir
        </button>
      </div>
    </article>

    <article class="card">
      <figure class="img__container">
        <img class="card__img" src="../../assets/libro.jpeg" alt="libro the pragmatic programmer" />
      </figure>
      <div class="card__body">
        <h3 class="card__title">The pragmatic programmer</h3>
        <p class="card__description">From journey to mastery</p>
        <p class="card__description">Autor: Jhon hernandez</p>
        <p class="card__description">Precio: 40$</p>
        <p class="card__description">quedan 25 documentos</p>

        <button class="card__btn" @click.prevent="adquirir()">
          Adquirir
        </button>
      </div>
    </article>

    <article class="card">
      <figure class="img__container">
        <img class="card__img" src="../../assets/libro.jpeg" alt="libro the pragmatic programmer" />
      </figure>
      <div class="card__body">
        <h3 class="card__title">The pragmatic programmer</h3>
        <p class="card__description">From journey to mastery</p>
        <p class="card__description">Autor: Jhon hernandez</p>
        <p class="card__description">Precio: 40$</p>
        <p class="card__description">quedan 25 documentos</p>

        <button class="card__btn" @click.prevent="adquirir()">
          Adquirir
        </button>
      </div>
    </article>
  </section>
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

<style>
@import url(styles.css);
</style>