<template>
  <router-link class="cancel__btn" :to="props.redirect">{{ props.text }}</router-link>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  interface Redirect {
    name: string,
    params?: { id: string }
  }

  const props = defineProps({
    text: String,
    redirect: Object as () => Redirect
  })
</script>

<style scoped>
.cancel__btn {
  text-decoration: none;
  text-align: center;
  padding: .4em .6em;
  background: #bdc2e8;
  border: none;
  border-radius: 6px;
  color: blue;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}

@media (width < 600px) {
  .cancel__btn {
    width: 90%;
  }
}
</style>