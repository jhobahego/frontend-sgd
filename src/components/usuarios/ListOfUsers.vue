<template>
  <article class="list__users">
    <header class="userslist__header">
      <h2>{{ titulo }}</h2>
      <router-link class="userslist__link" :to="{ name: 'usuarios' }">Manejo de usuarios
      </router-link>
    </header>
    <ul class="userslist" v-for="usuario in usuariosLimitados" :key="usuario._id">
      <li class="userslist__item">
        <p class="userslist__detail">
          <strong>Nombres: <span class="userslist__data">{{ usuario.nombres }}</span></strong>
        </p>

        <p class="userslist__detail">
          <strong>Correo: <span class="userslist__data">{{ usuario.correo }}</span></strong>
        </p>
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { UserResponse } from '../../interfaces/User'

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
    const usuariosLimitados = computed(() => {
      if (props.limite && props.usuarios.length > props.limite) {
        return props.usuarios.slice(0, props.limite);
      }

      return props.usuarios;
    });

    return {
      usuariosLimitados
    };
  }
})

</script>

<style scoped>
@import url(listOfUsers.css);
</style>