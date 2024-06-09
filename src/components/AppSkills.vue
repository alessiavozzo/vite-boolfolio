<script>
import { state } from '../state';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
export default {
    name: 'AppSkills',
    components: {
        Carousel,
        Slide,
        Navigation,
        Pagination
    },
    data() {
        return {
            state: state,
            skills: []
        }
    },
    methods: {
        getSkills(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response.data.technologies);
                    this.skills = response.data.technologies;
                    console.log(this.skills);
                    this.loading = false
                })
                .catch(error => console.log(error));
        }
    },
    mounted() {
        let url = state.base_api_url + state.technologies_url;
        this.getSkills(url);
    }
}
</script>

<template>
    <section id="skills">
        <Carousel :autoplay="2000" :wrap-around="true" :itemsToScroll="1" :itemsToShow="8">
            <!-- <Slide v-for="slide in 10" :key="slide">
                <div class="carousel__item" style="width: 40px; border: 1px solid red;">{{ slide }}</div>
            </Slide>

            <template #addons>
                <Pagination />
            </template> -->
            <Slide v-for="(skill, index) in skills" :key="index">
                <!-- <img class="carousel__item" style="width: 40px; border: 1px solid red;"> -->
                <img class="carousel__item" width="100px" v-if="skill.image && skill.image.startsWith('uploads')"
                    :src="state.base_api_url + '/storage/' + skill.image" alt="">
                <img class="carousel__item" width="100px" v-else-if="skill.image && skill.image.startsWith('img')"
                    :src="state.base_api_url + '/' + skill.image" alt="">
            </Slide>

            <template #addons>
                <Pagination />
            </template>
        </Carousel>

        <div v-for="skill in skills">
            <!-- {{ skill.name }} -->

            <div class="image">
                <img width="100px" v-if="skill.image && skill.image.startsWith('uploads')"
                    :src="state.base_api_url + '/storage/' + skill.image" alt="">
                <img width="100px" v-else-if="skill.image && skill.image.startsWith('img')"
                    :src="state.base_api_url + '/' + skill.image" alt="">
            </div>
        </div>
    </section>

</template>



<style scoped></style>