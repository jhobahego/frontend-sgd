<template>
  <section class="auth__container">
    <article class="auth__card" :class="{ 'auth__card--register': register }">
      <header class="auth__info">
        <h2 class="info__title">Sistema de gestión documental</h2>
        <p class="info__description">
          Compra y presta todo tipo de documentos tanto en digital como en fisico y obten un servicio personalizado de
          calidad.
        </p>
        <p class="info__slogan">
          Organiza tu información, simplifica tu trabajo: Con tu gestor documental de confianza".
        </p>
      </header>

      <article class="auth__form">
        <LoginForm v-if="!register" />

        <RegisterForm v-else />

        <button class="btn__switch" v-if="!register" @click.prevent="authSwitch()">Crear cuenta nueva</button>
        <div class="btn__container" v-else>
          <span>¿Ya tienes una cuenta?</span>
          <button class="btn__switch" :class="{ 'btn__switch--register': register }" @click.prevent="authSwitch()">Iniciar
            sesion</button>
        </div>
      </article>

    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '@/components/forms/auth/LoginForm.vue';
import RegisterForm from '@/components/forms/auth/RegisterForm.vue';
import { useAuth } from '@/store/authStore';

export default defineComponent({
  name: 'authView',
  data() {
    return {
      register: false
    }
  },

  components: {
    LoginForm,
    RegisterForm,
  },

  methods: {
    authSwitch() {
      this.register = !this.register;
    },
  },

  mounted() {
    const authStore = useAuth();
    const token = authStore.token;

    if(token.length > 0) {
      this.$router.push("/");
    }
  }
})

</script>

<style>
@import url(authview.css);</style>