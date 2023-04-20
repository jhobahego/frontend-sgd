<template>
  <article class="form__card">
    <figure class="img__container">
      <img class="document__img" src="@/assets/libro.jpeg" alt="libro the pragmatic programmer" />
    </figure>

    <div class="form__container">
      <header class="document__info">
        <h3 class="document__title">{{ documento.titulo }}</h3>
        <p class="document__description">Quedan {{ documento.stock }} unidades</p>
        <p class="document__description">precio: {{ documento.precio }}$</p>
      </header>
      <form class="form__body" @submit.prevent="comprar()">

        <input class="form__email" type="text" placeholder="Correo electronico...">
        <input class="form__quantity" type="number" placeholder="Cantidad...">
        <select class="form__select" id="opciones">
          <option value="compra">compra</option>
          <option value="prestamo">prestamo</option>
        </select>

        <div class="buttons">
          <button type="submit" class="purchase__btn">adquirir</button>
          <button @click.prevent="cancelar()" class="cancel__btn">Cancelar</button>
        </div>
      </form>
    </div>
  </article>
</template>

<script lang="ts">
import { Document } from '@/interfaces/Document';
import { defineComponent } from 'vue';

export default defineComponent ({
  name: "purchaseForm",

  props: {
    documento: {
      type: Object as () => Document,
      required: true
    },
  },

  methods: {
    comprar() {
      alert('TODO: Hacer metodo comprar');
    },

    cancelar() {
      this.$router.push(`/documento/${this.documento._id}`)
    },
  },
})
</script>

<style>
@import url(purchase.css);
</style>