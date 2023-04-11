<template>
  <form action="#" class="form__login">
    <input class="login__input login__input--first" type="text" placeholder="correo electronico...">
    <input class="login__input" type="password" placeholder="contraseña...">
    <button class="btn__login">Iniciar sesión</button>
    <span>¿olvidaste tu contraseña?</span>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "loginForm",
})
</script>
