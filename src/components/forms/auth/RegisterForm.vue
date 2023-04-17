<template>
  <form @submit.prevent="registrar()" class="form__register">
    <div class="register__div register__div--first">
      <input v-model="usuario.nombres" class="register__input" type="text" placeholder="nombres...">
      <input v-model="usuario.apellidos" class="register__input" type="text" placeholder="apellidos...">
    </div>
    <input v-model="usuario.correo" class="register__input" type="email" placeholder="correo electronico...">
    <input v-model="usuario.contra" class="register__input" type="password" placeholder="contraseña...">
    <div class="register__div">
      <input v-model="usuario.ciudad" class="register__input" type="text" placeholder="ciudad...">
      <input v-model="usuario.pais" class="register__input" type="text" placeholder="país...">
    </div>
    <button type="submit" class="btn__register">Registrarse</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RegisterUser } from '@/interfaces/User';
import { registrarUsuario } from '@/services/AuthService';

export default defineComponent({
  name: "registerForm",

  data() {
    return {
      usuario: {} as RegisterUser
    }
  },

  methods: {
    async registrar() {
      const res = await registrarUsuario(this.usuario);
      if(res) {
        localStorage.setItem("usuario", res.data.nombres);
        this.$router.push("/");
      }
      alert("hubo un problema al intentar registrar el usuario");
    }
  },

})
</script>

<style>
@import url(register.css);
</style>