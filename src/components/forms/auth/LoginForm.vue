<template>
  <form class="form__login">
    <input v-model="credentials.correo" class="login__input login__input--first" type="email"
      placeholder="correo electronico...">
    <input v-model="credentials.contra" class="login__input" type="password" placeholder="contraseña...">
    <button @click.prevent="iniciarSesion()" type="submit" class="btn__login">Iniciar sesión</button>
    <span>¿olvidaste tu contraseña?</span>
    <notifications position="top right" width="400px" animation-type="css" classes="notify__topright--error"/>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LoginUser } from '@/interfaces/User';
import { notify } from '@kyvg/vue3-notification';
import { useAuth } from '@/store/authStore';

export default defineComponent({
  name: "loginForm",

  data() {
    return {
      credentials: {} as LoginUser,
    }
  },

  methods: {
    async iniciarSesion() {
      const store = useAuth();

      await store.login(this.credentials);
      const token = store.token;

      if (token.length > 0) {
        localStorage.setItem("token", token);
        this.$router.push("/");
      } else {
        notify({
        title: "Fallo al iniciar sesión",
        text: "Correo electronico o contraseña invalidos",
        type: "error",
        closeOnClick: true,
      })
      }
    },
  },
})
</script>

<style>
@import url(login.css);
</style>