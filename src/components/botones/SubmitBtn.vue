<template>
  <button class="submit__btn" @click.prevent="iniciarSesion()">{{ props.title }}</button>
</template>

<script lang="ts" setup>
  // import { defineProps } from 'vue';

  const iniciarSesion = () => {
    props.action();
  }

  const props = defineProps({
    title: String,
    action: {
      type: Function,
      required: true
    }
  })

</script>

<style scoped>
.submit__btn {
  background: var(--light-blue-alpha);
  color: blue;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: .6em .8em;
}
</style>