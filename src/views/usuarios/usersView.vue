<template>
  <h1 class="title">Gestión de usuarios</h1>

  <header class="list__header">
    <form class="form__filter">
      <label class="header__label">
        criterio
        <select class="criterio__select" v-model="criterio">
          <option value="nombre">nombre</option>
          <option value="correo">correo</option>
        </select>
      </label>
      <label class="header__label">
        buscar
        <input class="search__input" type="text" placeholder="Jhon Bairo, Rafael Santos, Maria Jose..." v-model="busqueda">
      </label>
    </form>
  </header>
  <h2 class="users__title">{{ title }}</h2>
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
import { ref, onMounted, watch, computed } from 'vue';
import { obtenerUsuarios } from '@/services/userService';
import { RegisterUser, UsuarioFiltrado } from '@/interfaces/User';

const title = ref('');
const usuarios = ref<RegisterUser[]>([]);
const usuariosFiltrados = ref<UsuarioFiltrado[]>([]);
const busqueda = ref('');
const criterio = ref('nombre');

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

watch([busqueda, criterio], filtrarUsuario);

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
