<script>

import AppHeader from "./components/AppHeader.vue";
/* import AppJumbo from "./components/AppJumbo.vue"; */



export default {
  name: 'App',
  components: {
    AppHeader,
    /* AppJumbo */
  },


}
</script>

<template>

  <AppHeader />
  <!-- <AppJumbo /> -->
  <router-view></router-view>
  <footer>footer</footer>

</template>

<style scoped></style>
