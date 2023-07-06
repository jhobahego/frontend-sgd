<template>
  <button class="submit__btn" @click.prevent="iniciarSesion()">{{ props.title }}</button>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'

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