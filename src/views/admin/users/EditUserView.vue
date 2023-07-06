<template>
  <h1 class="edit__title">Manejo de usuarios</h1>
  <form class="edit__form">
    <div class="nombres__joiner">
      <label class="label__nombres">
        nombres
        <input class="nombres__input" type="text" placeholder="jhon" v-model="usuario.nombres">
      </label>
      <label class="label__apellidos">
        apellidos
        <input class="apellidos__input" type="text" placeholder="hernandez" v-model="usuario.apellidos">
      </label>
    </div>
    <label class="edituser__label">
      correo
      <input class="editUser__input" type="text" placeholder="jhoba@gmail.com" v-model="usuario.correo">
    </label>
    <label class="edituser__label">
      pais
      <input class="editUser__input" type="text" placeholder="Colombia, peru, venezuela..." v-model="usuario.pais">
    </label>
    <label class="edituser__label">
      ciudad
      <input class="editUser__input" type="text" placeholder="Bogota, lima, caracas..." v-model="usuario.ciudad">
    </label>
    <label class="edituser__label">
      rol
      <select class="editUser__input" v-model="usuario.rol">
        <option>USER</option>
        <option>ADMIN</option>
      </select>
    </label>
    <div class="form__buttons">
      <button class="eliminar__btn" @click.prevent="borrarUsuario(usuario._id)">Eliminar usuario</button>
      <SubmitBtn title="Editar usuario" :action="editarUsuario" />
      <CancelBtn text="Volver" :redirect="{ name: 'usuarios' }" />
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
import SubmitBtn from '@/components/botones/SubmitBtn.vue'
import CancelBtn from '@/components/botones/CancelBtn.vue'

const usuario: Ref<RegisterUser> = ref({} as RegisterUser);

onMounted(async () => {
  const route = useRoute();
  const correo = route.params.id;

  usuario.value = await obtenerUsuario(correo);
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
@import url(editUserView.css);
</style>