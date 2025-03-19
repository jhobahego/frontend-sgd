<template>
  <div class="search-box">
    <input v-model="query" type="text" placeholder="Describe lo que buscas..." @keyup.enter="realizarBusqueda"
      :disabled="isLoading" />
    <button @click="realizarBusqueda" :disabled="isLoading">
      <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
      <i v-else class="fas fa-search"></i>
      {{ isLoading ? 'Buscando...' : 'Buscar' }}
    </button>
  </div>

  <div v-if="busquedaRealizada && !isLoading && resultados.length === 0" class="no-results">
    <i class="fas fa-file-search"></i>
    <p>No se encontraron documentos que coincidan con su consulta.</p>
    <p>Intente con términos más generales o verifique la ortografía.</p>
  </div>

  <!-- Dialog para mostrar resultados (se abre automáticamente) -->
  <dialog ref="dialogRef" class="results-dialog">
    <div v-if="resultados.length > 0" class="results-info">
      <p>
        {{ resultados.length }} resultados encontrados ({{ tiempoEjecucion }}s)
      </p>
    </div>

    <div class="results-container">
      <div v-for="(resultado, index) in resultados" :key="index" class="result-item">
        <div class="relevance-indicator" :style="{ width: `${resultado.relevancia * 100}%` }"></div>
        <h3 class="result-title">
          <router-link :to="'/documento/' + resultado.documento_id">
            {{ resultado.titulo }}
          </router-link>
        </h3>
        <p class="relevance">Relevancia: {{ (resultado.relevancia * 100).toFixed(0) }}%</p>
        <p v-if="resultado.fragmento" class="snippet">{{ resultado.fragmento }}</p>
        <div class="result-actions">
          <button @click="verDocumento(resultado.documento_id)" class="action-button view">
            <i class="fas fa-eye"></i> Ver documento
          </button>
          <button @click="procesarConIA(resultado.documento_id)" class="action-button ai">
            <i class="fas fa-robot"></i> Procesar con IA
          </button>
        </div>
      </div>
    </div>

    <div v-if="mostrarSugerenciasIA && resultados.length > 0" class="ai-suggestions">
      <h4>Sugerencias de IA</h4>
      <ul>
        <li>Para resultados más específicos, incluya términos técnicos relevantes.</li>
        <li>Intente especificar rangos de fechas o períodos específicos.</li>
        <li>Incluya nombres de autores o fuentes para filtrar mejor los resultados.</li>
        <li>Use palabras clave de la categoría para enfocar la búsqueda.</li>
      </ul>
    </div>

    <button @click="dialogRef?.close()" class="close-dialog-button">Cerrar</button>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { realizarBusquedaSemantica } from '@/services/IAService';
import { notify } from '@/services/toastNotificationService';

export default defineComponent({
  name: 'BusquedaSemantica',

  setup() {
    const router = useRouter();
    const query = ref('');
    const resultados = ref<any[]>([]);
    const isLoading = ref(false);
    const busquedaRealizada = ref(false);
    const tiempoEjecucion = ref(0);
    const mostrarSugerenciasIA = ref(false);
    const dialogRef = ref<HTMLDialogElement | null>(null);

    // Observar cambios en resultados para mostrar el diálogo automáticamente
    watch(resultados, (newResultados) => {
      if (newResultados.length > 0 && dialogRef.value) {
        dialogRef.value.showModal();
      }
    });

    const realizarBusqueda = async () => {
      if (!query.value.trim()) {
        notify({
          title: 'Error',
          text: 'Por favor ingrese una consulta para buscar',
          type: 'error'
        });
        return;
      }

      try {
        // Desactivar la interfaz mientras se realiza la búsqueda
        isLoading.value = true;

        // Reset de resultados anteriores
        resultados.value = [];
        mostrarSugerenciasIA.value = false;

        const response = await realizarBusquedaSemantica(query.value, 10);

        resultados.value = response.resultados;
        tiempoEjecucion.value = response.tiempo_ejecucion;

        // Marcar la búsqueda como realizada solo después de obtener los resultados
        busquedaRealizada.value = true;

        // Mostrar sugerencias de IA después de un periodo
        setTimeout(() => {
          mostrarSugerenciasIA.value = true;
        }, 2000);

      } catch (error) {
        console.error('Error al realizar búsqueda semántica:', error);
        notify({
          title: 'Error',
          text: 'Ha ocurrido un error al realizar la búsqueda',
          type: 'error'
        });
        busquedaRealizada.value = true; // Marcar como realizada también en caso de error
      } finally {
        isLoading.value = false;
      }
    };

    const verDocumento = (documentoId: string) => {
      router.push(`/documento/${documentoId}`);
      if (dialogRef.value) {
        dialogRef.value.close();
      }
    };

    const procesarConIA = (documentoId: string) => {
      notify({
        title: 'Procesamiento IA',
        text: 'Esta función se implementará próximamente',
        type: 'info'
      });
    };

    return {
      query,
      resultados,
      isLoading,
      busquedaRealizada,
      tiempoEjecucion,
      mostrarSugerenciasIA,
      realizarBusqueda,
      verDocumento,
      procesarConIA,
      dialogRef
    };
  }
});
</script>

<style scoped>
.search-box {
  display: flex;
}

.search-box input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-box input:focus {
  border-color: #4285f4;
  outline: none;
}

.search-box button {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
}

.search-box button:hover {
  background-color: #3367d6;
}

.search-box button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.results-info {
  margin-bottom: 15px;
  color: #666;
  font-size: 14px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.loading-icon {
  font-size: 40px;
  color: #4285f4;
  margin-bottom: 15px;
}

.no-results {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.no-results i {
  font-size: 48px;
  margin-bottom: 15px;
  color: #ddd;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-item {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.relevance-indicator {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background-color: #4285f4;
}

.result-title {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 18px;
}

.result-title a {
  color: #1a73e8;
  text-decoration: none;
}

.result-title a:hover {
  text-decoration: underline;
}

.relevance {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.snippet {
  color: #333;
  margin-bottom: 15px;
  line-height: 1.4;
}

.result-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.2s;
}

.view {
  background-color: #e8f0fe;
  color: #1a73e8;
}

.view:hover {
  background-color: #d2e3fc;
}

.ai {
  background-color: #f6f8fa;
  color: #5f6368;
}

.ai:hover {
  background-color: #eef1f5;
}

.ai-suggestions {
  margin-top: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #fbbc04;
}

.ai-suggestions h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #5f6368;
}

.ai-suggestions ul {
  padding-left: 20px;
}

.ai-suggestions li {
  margin-top: 5px;
  margin-bottom: 5px;
  color: #5f6368;
  font-size: 14px;
}

/* Modal de resultados */
.results-dialog {
  margin: auto;
  max-width: 800px;
  padding: 20px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.results-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.close-dialog-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.open-dialog-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
