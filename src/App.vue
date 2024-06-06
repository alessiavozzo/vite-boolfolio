<script>

import AppHeader from "./components/AppHeader.vue";
import AppNavigation from "./components/AppNavigation.vue";
/* import AppJumbo from "./components/AppJumbo.vue"; */



export default {
  name: 'App',
  components: {
    AppHeader,
    AppNavigation,
    /*  AppJumbo */
  },


}
</script>

<template>

  <AppHeader />
  <!-- <AppJumbo/> -->
  <AppNavigation />
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <Component :is="Component" />
    </transition>
  </router-view>
  <!-- <router-view /> -->

</template>

<style scoped>
.slide-enter-from,
.slide-leave.to {
  opacity: 0;
  transform: translateX(-100%);
}

/* quando sta avvenendo la transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
}
</style>
