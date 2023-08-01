<template>
  <form class="form__register">
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
    <SubmitBtn title="Registrarse" :action="registrar" />
    <notifications position="top right" animation-type="css" style="margin-top: 4em;" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LoginUser, RegisterUser } from '@/interfaces/User';
import { useAuth } from '@/store/authStore';
import SubmitBtn from '@/components/botones/SubmitBtn.vue'

export default defineComponent({
  name: "registerForm",

  data() {
    return {
      usuario: {} as RegisterUser
    }
  },

  components: {
    SubmitBtn
  },

  methods: {
    async registrar() {
      const authStore = useAuth();
      await authStore.register(this.usuario);

      const { hasError } = authStore.$state;
      if (hasError) return;

      const { correo, contra } = this.usuario;
      await authStore.login({ correo, contra } as LoginUser);

      this.$router.push("/");
    }
  },

})
</script>

<style>
@import url(register.css);
</style>