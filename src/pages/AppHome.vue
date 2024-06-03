<script>

import AppJumbo from "../components/AppJumbo.vue";
import BestProjects from "../components/BestProjects.vue";
export default {
    name: 'AppHome',
    components: {
        AppJumbo,
        BestProjects
    },
    data() {
        return {

        }
    },
    methods: {
        scrollToNextSection() {
            //console.log('next section');
            //console.log(this.$refs.bestProjects);
            const nextSection = this.$refs.bestProjects;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' })
            }
        },

    },

}
</script>

<template>
    <AppJumbo ref="appJumbo" @scrollToNextSection="scrollToNextSection" />
    <div ref="bestProjects">
        <BestProjects />
    </div>
</template>



<style scoped></style>