<template>
  <form class="form__login">
    <input v-model="credentials.correo" class="login__input login__input--first" type="email" placeholder="correo electronico...">
    <input v-model="credentials.contra" class="login__input" type="password" placeholder="contraseña...">
    <button @click.prevent="iniciarSesion()" type="submit" class="btn__login">Iniciar sesión</button>
    <span>¿olvidaste tu contraseña?</span>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LoginUser } from '@/interfaces/User';
import { autenticarUsuario } from '@/services/AuthService';

export default defineComponent({
  name: "loginForm",

  data() {
    return {
      credentials: {} as LoginUser,
    }
  },

  methods: {
    async iniciarSesion() {
      const res = await autenticarUsuario(this.credentials);
      if(res) {
        localStorage.setItem("token", res.data.access_token);
        this.$router.push("/");
      }else{
        alert("credenciales invalidas");
      }
    },
  },
})
</script>

<style>
@import url(login.css);
</style>