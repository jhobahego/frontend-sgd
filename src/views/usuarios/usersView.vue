<template>
  <h1 class="title">Gestión de usuarios</h1>

  <h2 class="users__title">Usuarios registrados</h2>
  <ul class="users__list">
    <li class="user__item" v-for="usuario in usuarios" :key="usuario._id">
      <h4 class="user__names">{{ usuario.nombres }} {{ usuario.apellidos }}</h4>
      <strong class="user__info">{{ usuario.correo }}</strong>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue';
import { obtenerUsuarios } from '@/services/userService';
import { RegisterUser } from '@/interfaces/User';

const usuarios: Ref<RegisterUser[]> = ref([]);

onMounted(async () => {
  usuarios.value = await obtenerUsuarios();
});

</script>

<style scoped>
@import url(usersView.css);
</style>