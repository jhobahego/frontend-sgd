<template>
  <NavBar />
  <main>
    <router-view/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';

export default defineComponent({
  name: "app",
  components: {
    NavBar,
  },
});

</script>