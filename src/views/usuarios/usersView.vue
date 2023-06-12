<template>
  <h1 class="title">Gestión de usuarios</h1>

  <div class="list__header">
    <label class="search__label">
      criterio
      <select class="search__type">
        <option value="nombre">nombre</option>
        <option value="correo">correo</option>
        <option value="libre">libre</option>
      </select>
    </label>
    <h2 class="users__title">Usuarios registrados</h2>
    <form class="user__filter">
      <label>
        buscar
        <input type="text" placeholder="Jhon Hernandez" v-model="nombre">
      </label>
    </form>
  </div>
  <ul class="users__list">
    <li class="user__item" v-for="usuario in usuariosMostrados" :key="usuario._id">
      <h4 class="user__names">{{ usuario.nombres }} {{ usuario.apellidos }}</h4>
      <strong class="user__info">{{ usuario.correo }}</strong>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted, watch, computed } from 'vue';
import { obtenerUsuarios } from '@/services/userService';
import { RegisterUser, UsuarioFiltrado } from '@/interfaces/User';

const title: Ref<string> = ref('');
const usuarios: Ref<RegisterUser[]> = ref([]);
const usuariosFiltrados: Ref<UsuarioFiltrado[]> = ref([]);
const nombre: Ref<string> = ref('');

onMounted(async () => {
  usuarios.value = await obtenerUsuarios();
  if (usuarios.value.length > 1) {
    title.value = "Listado de usuarios";
  }
});

const filtrarUsuario = () => {
  usuariosFiltrados.value = usuarios.value.map(usuario => ({
    ...usuario,
    encontrado: usuario.nombres.startsWith(nombre.value.trim()) || usuario.nombres.includes(nombre.value.trim())
  }));

  if (nombre.value.trim().length === 0) {
    title.value = "Listado de usuarios";
  } else if (usuariosFiltrados.value.some(usuario => usuario.encontrado)) {
    title.value = "Usuarios encontrados";
  } else {
    title.value = "Usuario no encontrado";
  }
};

watch(nombre, filtrarUsuario);

const usuariosMostrados = computed(() => {
  if (nombre.value.trim().length === 0) {
    return usuarios.value;
  }

  return usuariosFiltrados.value.filter(usuario => usuario.encontrado);
});

</script>

<style scoped>
@import url(usersView.css);
</style>