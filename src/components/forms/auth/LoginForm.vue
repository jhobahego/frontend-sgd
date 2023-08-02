<template>
  <form class="form__login">
    <input v-model="credentials.correo" class="login__input login__input--first" type="email"
      placeholder="correo electronico...">
    <input v-model="credentials.contra" class="login__input" type="password" placeholder="contraseña...">
    <SubmitBtn class="login__btn" title="Iniciar sesion" :action="iniciarSesion" />
    <span>¿olvidaste tu contraseña?</span>
    <notifications position="top right" width="400px" animation-type="css" style="margin-top: 4em;" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LoginUser } from '@/interfaces/User';
import { useAuth } from '@/store/authStore';
import SubmitBtn from '@/components/botones/SubmitBtn.vue'

export default defineComponent({
  name: "loginForm",

  data() {
    return {
      credentials: {} as LoginUser,
    }
  },

  components: {
    SubmitBtn
  },

  methods: {
    async iniciarSesion() {
      const store = useAuth();

      await store.login(this.credentials);

      const { hasError } = store.$state;
      if (hasError) return;

      await store.profile();
      return this.$router.push("/");
    },
  },
})
</script>

<style scoped>
@import url(login.css);
</style>