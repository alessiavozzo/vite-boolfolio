<script>

import AppJumbo from "../components/AppJumbo.vue";
import BestProjects from "../components/BestProjects.vue";
import AppSkills from "../components/AppSkills.vue";
export default {
    name: 'AppHome',
    components: {
        AppJumbo,
        BestProjects,
        AppSkills
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

    }
}
</script>

<template>
    <div>
        <AppJumbo ref="appJumbo" @scrollToNextSection="scrollToNextSection" />
        <div ref="bestProjects">
            <BestProjects />
        </div>
        <div ref="skills">
            <AppSkills />
        </div>

    </div>
</template>



<style scoped></style>