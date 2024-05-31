<script>

import AppHeader from "./components/AppHeader.vue";


export default {
  name: 'App',
  components: {
    AppHeader
  },


}
</script>

<template>

  <AppHeader />
  <router-view></router-view>
  <footer>footer</footer>

</template>

<style scoped></style>
