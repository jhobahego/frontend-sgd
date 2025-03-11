<template>
  <div class="ia-view">
    <div class="container">
      <div class="page-header">
        <h1>Asistente de IA</h1>
        <p class="description">
          Consulte información y obtenga ayuda con sus documentos utilizando nuestra inteligencia artificial.
        </p>
      </div>
      
      <AsistenteIA />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AsistenteIA from '@/components/ai/AsistenteIA.vue';

export default defineComponent({
  name: 'IAView',
  components: {
    AsistenteIA
  }
});
</script>

<style scoped>
.ia-view {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 2rem;
  color: #333;
  margin: 0 0 10px;
}

.description {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}
</style>
