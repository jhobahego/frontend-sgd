<template>
  <section class="document__container">
    <article class="document__card">
      <figure class="img__container">
        <img class="document__img" src="@/assets/libro.jpeg" alt="libro the pragmatic programmer">
      </figure>

      <div class="document__info">
        <h3 class="document__title">The pragmatic programmer</h3>
        <p class="document__description">
          From journey to mastery
        </p>
        <p class="document__description">
          precio: 45$
        </p>
        <p class="document__description">
          stock: 23
        </p>
        <button class="buy__btn">adquirir</button>
      </div>

    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'documentDetalView',
})
</script>