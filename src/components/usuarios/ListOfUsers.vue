<template>
  <article class="list__users">
    <header class="userslist__header">
      <h2 class="userslist__title">{{ titulo }}</h2>
      <router-link class="userslist__link" :to="{ name: 'usuarios' }">Manejo de usuarios
      </router-link>
    </header>
    <ul class="userslist" v-for="usuario in usuariosLimitados" :key="usuario._id">
      <li class="userslist__item">
        <p class="userslist__nombres">
          <strong>Nombres: <span class="userslist__data">{{ usuario.nombres }}</span></strong>
        </p>
        <p class="userslist__detail">
          <strong>Correo: <span class="userslist__data">{{ usuario.correo }}</span></strong>
        </p>
        <button class="user__details" @click="verDetalle(usuario.correo)">Ver mas detalles</button>
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { UserResponse } from '../../interfaces/User'
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    titulo: {
      type: String,
      require: true
    },
    usuarios: {
      type: Array as () => UserResponse[],
      required: true
    },
    limite: {
      type: Number,
      require: false
    }
  },
  setup(props) {
    const router = useRouter();

    const verDetalle = (correo: string) => {
      if (correo != undefined) {
        router.push({ name: 'EditarUsuario', params: { id: correo } })
      }
    }
    const usuariosLimitados = computed(() => {
      if (props.limite && props.usuarios.length > props.limite) {
        return props.usuarios.slice(0, props.limite);
      }

      return props.usuarios;
    });

    return {
      usuariosLimitados,
      verDetalle
    };
  }
})

</script>

<style scoped>
@import url(listOfUsers.css);
</style>