<template>
  <h1 class="title">Gestión de usuarios</h1>

  <header class="list__header">
    <label class="header__label">
      criterio
      <select class="select__criterio" v-model="criterio">
        <option value="nombre">nombre</option>
        <option value="correo">correo</option>
      </select>
    </label>
    <h2 class="users__title">Usuarios registrados</h2>
    <form class="form__filter">
      <label class="header__label">
        buscar
        <input class="search__input" type="text" placeholder="Jhon Hernandez" v-model="busqueda">
      </label>
    </form>
  </header>
  <ul class="users__list">
    <li class="user__item" v-for="usuario in usuariosMostrados" :key="usuario._id">
      <router-link class="user__info" :to="{ name: 'EditarUsuario', params: { id: usuario.correo } }">
        <h4 class="user__nombres">nombre: {{ usuario.nombres }} {{ usuario.apellidos }}</h4>
        <h4 class="user__correo">correo: {{ usuario.correo }}</h4>
      </router-link>
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
const busqueda: Ref<string> = ref('');
const criterio: Ref<string> = ref('nombre');

onMounted(async () => {
  usuarios.value = await obtenerUsuarios();
  if (usuarios.value.length > 1) {
    title.value = "Listado de usuarios";
  }
});

const filtrarUsuario = () => {
  usuariosFiltrados.value = usuarios.value.map(usuario => ({
    ...usuario,
    encontrado: (criterio.value === 'nombre' && (usuario.nombres.startsWith(busqueda.value.trim()) || usuario.nombres.includes(busqueda.value.trim()))) ||
      (criterio.value === 'correo' && (usuario.correo.startsWith(busqueda.value.trim()) || usuario.correo.includes(busqueda.value.trim())))
  }));

  if (busqueda.value.trim().length === 0) {
    title.value = "Listado de usuarios";
  } else if (usuariosFiltrados.value.some(usuario => usuario.encontrado)) {
    title.value = "Usuarios encontrados";
  } else {
    title.value = "Usuario no encontrado";
  }
};

watch(busqueda, filtrarUsuario);
watch(criterio, filtrarUsuario);

const usuariosMostrados = computed(() => {
  if (busqueda.value.trim().length === 0) {
    return usuarios.value;
  }

  return usuariosFiltrados.value.filter(usuario => usuario.encontrado);
});

</script>

<style scoped>
@import url(usersView.css);
</style>