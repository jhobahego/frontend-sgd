<template>
  <h1 class="title">Gestión de usuarios</h1>

  <h3 class="users__title">Usuarios registrados</h3>
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
.title {
  color: blue;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.2em;
}

.users__title {
  text-align: center;
  color: blue;
  margin-bottom: .6em;
}

.users__list {
  width: 100%;
  max-width: 400px;
  /* background: var(--light-blue-alpha); */
  margin: 0 auto;
}

.user__item {
  width: 100%;
  text-align: center;
  text-decoration: none;
  list-style: none;
  padding: .6em 0;
  /* border-bottom: 1px solid #0008; */
}
</style>