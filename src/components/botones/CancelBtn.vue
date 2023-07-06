<template>
  <router-link class="cancel__btn" :to="redirect">{{ text }}</router-link>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  interface Redirect {
    name: string,
    params?: { id?: string }
  }

  export default defineComponent({
    name: 'CancelBtn',

    props: {
      text: String,
      redirect: Object as () => Redirect
    }
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