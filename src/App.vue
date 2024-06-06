<script>
import { state } from "./state";
import AppHeader from "./components/AppHeader.vue";
import AppNavigation from "./components/AppNavigation.vue";
/* import AppJumbo from "./components/AppJumbo.vue"; */



export default {
  name: 'App',
  data() {
    return {
      state
    }
  },
  components: {
    AppHeader,
    AppNavigation,
    /*  AppJumbo */
  },


}
</script>

<template>

  <AppHeader v-if="state.scroll_blocked == false" />
  <!-- <AppJumbo/> -->
  <AppNavigation v-if="state.scroll_blocked" />
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
