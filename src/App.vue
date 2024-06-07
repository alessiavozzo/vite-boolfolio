<script>
import { state } from "./state";
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
  data() {
    return {
      state: state,
      isPhone: window.matchMedia('(max-width: 768px)').matches
    }
  },
  methods: {
    checkScreen(e) {
      this.isPhone = e.matches
    },
  },
  computed: {
    showHeader() {
      return !state.scroll_blocked || this.isPhone || this.$route.name !== 'home';
    }
  },
  created() {
    let currentScreen = window.matchMedia('(max-width: 768px)');
    currentScreen.addEventListener('change', this.checkScreen);
    console.log(this.$route.name);
  }


}
</script>

<template>

  <AppHeader v-if="showHeader" />
  <!-- <AppJumbo/> -->
  <AppNavigation v-if="state.scroll_blocked && !isPhone && $route.name === 'home'" />
  <!-- metterlo nel jumbo? -->
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
