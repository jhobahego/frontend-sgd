<template>
  <h1>gestionar documento</h1>
  <form>
    <label class="label__titulo">
      titulo
      <input type="text" class="input__titulo" placeholder="clean code" v-model="documento.titulo">
    </label>

    <div class="div__joiner">
      <label type="text" class="label__stock">
        stock
        <input type="number" class="input__stock" placeholder="24" v-model="documento.stock">
      </label>
      <label type="number" class="label__precio">
        precio
        <input type="text" class="input__precio" placeholder="64" v-model="documento.precio">
      </label>
    </div>

    <div class="div__joiner">
      <label>
        tipo
        <select v-model="documento.tipo_documento">
          <option value="fisico">fisico</option>
          <option value="digital">digital</option>
        </select>
      </label>

      <label>
        categoria
        <select v-model="documento.categoria">
          <option value="desarrollo de software">desarrollo de software</option>
          <option value="romantico">romantico</option>
          <option value="contaduria">contaduria</option>
          <option value="deportes">deportes</option>
          <option value="comics">comics</option>
          <option value="anime">anime</option>
        </select>
      </label>
    </div>

    <label class="label__editorial">
      editorial
      <input type="text" class="input__editorial" placeholder="bogota sas, london-edits..." v-model="documento.editorial">
    </label>

    <div class="buttons__container">
      <button @click.prevent="editarDocumento(documento)">Actualizar</button>
      <router-link :to="{ name: 'AllDocumentsAdmin' }">Volver</router-link>
    </div>
  </form>
  <notifications position="bottom right" animation-type="css" width="50vw" />
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { Documento } from '@/interfaces/Documento';
import { obtenerDocumento, actualizarDocumento } from '@/services/DocumentService';
import { notify } from '@kyvg/vue3-notification';

const documento: Ref<Documento> = ref({} as Documento);

onMounted(async () => {
  const route = useRoute();
  const id = route.params.id;

  const { success, body, message } = await obtenerDocumento(id);
  if(!success) {
    notify({
      title: "Documento no encontrado",
      text: message,
      type: "error",
      duration: 3000,
    })
    return;
  }

  documento.value = body;
})

async function editarDocumento(documento: Documento) {
  const { success, message } = await actualizarDocumento(documento);

  if (!success) {
    notify({
      title: "Fallo al editar",
      text: message,
      type: "error",
      duration: 3000,
    })
    return;
  }

  notify({
    title: "Documento actualizado",
    text: message,
    type: "success",
    duration: 3000,
  })
}

</script>