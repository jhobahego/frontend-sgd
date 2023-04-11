<template>
  <form action="#" class="form__register">
    <div class="register__div register__div--first">
      <input class="register__input" type="text" placeholder="nombres...">
      <input class="register__input" type="text" placeholder="apellidos...">
    </div>
    <input class="register__input" type="email" placeholder="correo electronico...">
    <input class="register__input" type="password" placeholder="contraseña...">
    <div class="register__div">
      <input class="register__input" type="text" placeholder="ciudad...">
      <input class="register__input" type="text" placeholder="país...">
    </div>
    <button class="btn__register">Registrarse</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "registerForm",
})
</script>

<style>
@import url(register.css);
</style>