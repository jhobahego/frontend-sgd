<template>
  <article class="form__card">
    <figure class="img__container">
      <img class="document__img" src="@/assets/libro.jpeg" alt="libro the pragmatic programmer" />
    </figure>

    <div class="form__container">
      <header class="document__info">
        <h3 class="document__title">The pragmatic programmer</h3>
        <p class="document__description">Quedan 30 unidades</p>
        <p class="document__description">precio: 30$</p>
      </header>
      <form class="form__body" onsubmit="comprar()">

        <input class="form__email" type="text" placeholder="Correo electronico...">
        <input class="form__quantity" type="number" placeholder="Cantidad...">
        <select class="form__select" id="opciones">
          <option value="compra">compra</option>
          <option value="prestamo">prestamo</option>
        </select>

        <div class="buttons">
          <input type="submit" class="purchase__btn" value="comprar" />
          <router-link to="#" class="cancel__btn">Cancelar</router-link>
        </div>
      </form>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  name: "purchaseForm",
  methods: {
    comprar() {
      alert('TODO: Hacer metodo comprar');
    },
  },
})
</script>

<style>
@import url(purchase.css);
</style>