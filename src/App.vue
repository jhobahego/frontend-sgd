<template>
  <header class="navbar__container">
    <NavBar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/navbar/NavBar.vue';

export default defineComponent({
  name: "app",
  components: {
    NavBar,
  },
});

</script>

<style>
@import url(main.css);
</style>