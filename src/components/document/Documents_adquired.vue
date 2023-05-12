<template>
  <article class="record__items" v-for="registro in registros" :key="registro.registro_id">
    <img :src="registro.imagen" :alt="registro.titulo_documento">
    <div class="record__info">
      <h4 class="record__title">{{ registro.titulo_documento }}</h4>
      <p class="record__description">{{ registro.tipo_de_adquisicion }}</p>
      <p class="record__description">Documentos adquiridos: {{ registro.cantidad }}</p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Registro } from '@/interfaces/Registro';

export default defineComponent({
  props: {
    registros: {
      type: Object as () => Registro[],
      required: true,
    }
  }
})
</script>