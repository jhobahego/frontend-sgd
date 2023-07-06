<template>
  <h1 style="text-align: center;">vista de administración</h1>
  <section>

    <ListOfDocuments :titulo="titulo" :documentos="documentos" :limite="5" />
    <ListOfUsers :titulo="titulo" :usuarios="usuarios" :limite="10" />

  </section>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue';
import ListOfDocuments from '@/components/document/ListOfDocuments.vue';
import ListOfUsers from '@/components/usuarios/ListOfUsers.vue';
import { Documento } from '@/interfaces/Documento';
import { obtenerDocumentos } from '@/services/DocumentService';
import { UserResponse } from '@/interfaces/User';
import { obtenerUsuarios } from '@/services/userService';

const titulo = ref('Listado de documentos')
const documentos: Ref<Documento[]> = ref([])
const usuarios: Ref<UserResponse[]> = ref([])

onMounted(async () => {
  documentos.value = await obtenerDocumentos()
  usuarios.value = await obtenerUsuarios()
})
</script>