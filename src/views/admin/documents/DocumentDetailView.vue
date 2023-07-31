<template>
  <h1 class="title">{{ title }}</h1>
  <form class="editform" v-if="!fail">
    <label class="editform__label">
      titulo
      <input type="text" class="editform__input" placeholder="clean code" v-model="documento.titulo">
    </label>

    <div class="div__joiner">
      <label class="editform__label">
        stock
        <input type="number" class="editform__input" placeholder="24" v-model="documento.stock">
      </label>
      <label class="editform__label">
        precio
        <input type="number" class="editform__input" placeholder="64" v-model="documento.precio">
      </label>
    </div>

    <div class="div__joiner">
      <label class="editform__label">
        tipo
        <select class="editform__select" v-model="documento.tipo_documento">
          <option value="fisico">fisico</option>
          <option value="digital">digital</option>
        </select>
      </label>

      <label class="editform__label">
        categoria
        <select class="editform__select" v-model="documento.categoria">
          <option value="desarrollo de software">desarrollo de software</option>
          <option value="romantico">romantico</option>
          <option value="contaduria">contaduria</option>
          <option value="deportes">deportes</option>
          <option value="comics">comics</option>
          <option value="anime">anime</option>
        </select>
      </label>
    </div>

    <label class="editform__label">
      editorial
      <input type="text" class="editform__input" placeholder="bogota sas, london-edits..." v-model="documento.editorial">
    </label>

    <div class="buttons__container">
      <button class="form__button" @click.prevent="editarDocumento(documento)">Actualizar</button>
      <!-- <router-link class="form__button cancel__btn" :to="{ name: 'AllDocumentsAdmin' }">Volver</router-link> -->
      <CancelBtn text="Volver" :redirect="{ name: 'AllDocumentsAdmin' }" />
    </div>
  </form>
  <notifications position="bottom right" animation-type="css" width="50vw" />
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { Documento } from '@/interfaces/Documento';
import { obtenerDocumento, actualizarDocumento } from '@/services/DocumentService';
import CancelBtn from '@/components/botones/CancelBtn.vue'
import { notificationUtilities } from '@/services/notificationService';

const documento: Ref<Documento> = ref({} as Documento);
const title = ref('Gestionar documento')
const fail = ref(false)

onMounted(async () => {
  const route = useRoute();
  const id = route.params.id;

  try {
    const { data } = await obtenerDocumento(id);

    documento.value = data;
  } catch (error) {
    title.value = "oops ha habido un error";
    fail.value = true
  }
})

async function editarDocumento(documento: Documento) {
  const { status } = await actualizarDocumento(documento);
  if (status === 200) {
    notificationUtilities.success("Documento actualizado correctamente");
  }
}

</script>

<style scoped>
@import url(documentDetailView.css);
</style>