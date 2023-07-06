<template>
  <article style="padding: .4em 2em">
    <header style="display: flex; align-items: center; justify-content: space-between;">
      <h2>{{ titulo }}</h2>
      <router-link class="navbar__link" :to="{ name: 'usuarios' }">Manejo de usuarios
      </router-link>
    </header>
    <ul class="lista" v-for="usuario in usuariosLimitados" :key="usuario._id">
      <li class="item-lista">
        <p><strong>Nombres:</strong> {{ usuario.nombres }}</p>
        <p><strong>Correo:</strong> {{ usuario.correo }}</p>
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
.lista {
  padding: .2em 0;
}
</style>