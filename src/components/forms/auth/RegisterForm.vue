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
    <!-- <button type="submit" class="btn__register">Registrarse</button> -->
    <SubmitBtn title="Registrarse" :action="registrar" />
    <notifications position="top right" width="200px" animation-type="css" classes="notify__topright--error" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LoginUser, RegisterUser } from '@/interfaces/User';
import { notify } from '@kyvg/vue3-notification';
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
      const { usuario: userResponse } = authStore.$state;

      if (!userResponse) {
        notify({
          title: "Problema al registrar",
          text: "Hubo un problema al intentar registrar el usuario",
          duration: 4000,
        })
        return;
      }

      const { correo, contra } = this.usuario;
      await authStore.login({ correo, contra } as LoginUser);

      const haveToken = authStore.token.length > 0;
      if (haveToken) {
        this.$router.push("/");
      }
    }
  },

})
</script>

<style>
@import url(register.css);
</style>