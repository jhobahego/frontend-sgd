<template>
  <h1 class="edit__title">Manejo de usuarios</h1>
  <form class="edit__form">
    <div class="nombres__joiner">
      <label class="label__nombres">
        nombres
        <input type="text" placeholder="jhon" v-model="usuario.nombres">
      </label>
      <label class="label__apellidos">
        apellidos
        <input type="text" placeholder="hernandez" v-model="usuario.apellidos">
      </label>
    </div>
    <label>
      correo
      <input type="text" placeholder="jhoba@gmail.com" v-model="usuario.correo">
    </label>
    <label>
      pais
      <input type="text" placeholder="Colombia, peru, venezuela..." v-model="usuario.pais">
    </label>
    <label>
      ciudad
      <input type="text" placeholder="Bogota, lima, caracas..." v-model="usuario.ciudad">
    </label>
    <label>
      rol
      <select v-model="usuario.rol">
        <option>USER</option>
        <option>ADMIN</option>
      </select>
    </label>
    <div class="form__buttons">
      <button class="eliminar__btn" @click.prevent="borrarUsuario(usuario._id)">Eliminar usuario</button>
      <button class="submit__btn" @click.prevent="editarUsuario()">Editar usuario</button>
      <router-link class="cancel__btn" :to="{ name: 'usuarios' }">Volver</router-link>
    </div>
  </form>
  <notifications position="bottom right" animation-type="css" width="50vw" />
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { RegisterUser } from '@/interfaces/User';
import { obtenerUsuario, actualizarUsuario, eliminarUsuario } from '@/services/userService';
import { notify } from '@kyvg/vue3-notification';

const usuario: Ref<RegisterUser> = ref({} as RegisterUser);

onMounted(async () => {
  const route = useRoute();
  const nombres = route.params.id;

  usuario.value = await obtenerUsuario(nombres);
})

async function editarUsuario() {
  const res = await actualizarUsuario(usuario.value);

  const { message: mensaje, body: usuarioActualizado } = res;
  if (mensaje.length > 0) {
    notify({
      title: "Fallo al editar",
      text: `${mensaje}`,
      type: "error",
      duration: 3000,
    })
    return;
  }

  notify({
    title: "Usuario actualizado",
    text: `Usuario con nombre ${usuarioActualizado.nombres} actualizado correctamente`,
    type: "success",
    duration: 3000,
  })
}

async function borrarUsuario(usuario_id: string) {
  if (!confirm("¿Seguro quieres eliminar el usuario?")) {
    return;
  }

  const respuesta = await eliminarUsuario(usuario_id);
  if (respuesta.status === false) {
    notify({
      title: "Ha ocurrido un error",
      text: `${respuesta.message}`,
      type: "error",
      duration: 3000,
    })
    return;
  } 

  notify({
    title: "Usuario eliminado",
    text: `${respuesta.message}`,
    type: "success",
    duration: 3000,
  })
}

</script>

<style scoped>
@import url(editView.css);
</style>