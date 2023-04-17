<template>
  <article class="form__card">
    <figure class="img__container">
      <img class="form__img" src="@/assets/libro.jpeg" alt="libro the pragmatic programmer" />
    </figure>

    <div class="form__container">
      <header class="form__info">
        <h3 class="form__title">The pragmatic programmer</h3>
        <p class="form__description">Quedan 30 unidades</p>
        <p class="form__description">precio: 30$</p>
      </header>
      <form class="form__body" onsubmit="comprar()">

        <input type="text" placeholder="Correo electronico...">
        <input type="number" placeholder="Cantidad...">
        <select class="form__select" id="opciones">
          <option value="compra">compra</option>
          <option value="prestamo">prestamo</option>
        </select>

        <input type="submit" class="purchase__btn" value="comprar" />
        <router-link to="#" class="cancel__btn">Cancelar</router-link>
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