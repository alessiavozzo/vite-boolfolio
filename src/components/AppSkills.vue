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
            skills: [],
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
        },
    },
    mounted() {
        let url = state.base_api_url + state.technologies_url;
        this.getSkills(url);
    }
}
</script>

<template>
    <section id="skills">
        <div class="container">
            <h3 class="space-mono-regular">
                MY SKILLS
            </h3>

        </div>

        <Carousel :autoplay="800" :wrap-around="true" :itemsToScroll="1" :itemsToShow="8" :transition="800"
            :pauseAutoplayOnHover="true" :mouseDrag="true" snapAlign="start">

            <Slide v-for="(skill, index) in skills" :key="index">
                <div class="box">
                    <span></span>
                    <img class="carousel__item" v-if="skill.image && skill.image.startsWith('uploads')"
                        :src="state.base_api_url + '/storage/' + skill.image" alt="">
                    <img class="carousel__item" v-else-if="skill.image && skill.image.startsWith('img')"
                        :src="state.base_api_url + '/' + skill.image" alt="">
                </div>
            </Slide>

        </Carousel>



    </section>

</template>



<style scoped>
#skills {
    padding-bottom: 80px;

    .container {
        max-width: 1200px;

        h3 {
            font-size: 2.5rem;
            text-align: center;
            padding: 4rem 0;
            color: var(--portfolio-light);
        }
    }
}

.box {
    position: relative;
    width: 150px;
    height: 150px;
    background-color: var(--portfolio-header);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        width: 200px;
        height: 200px;
        background-image: conic-gradient(transparent, transparent, transparent, var(--portfolio-main));
        animation: rotate 4s linear infinite;
        animation-delay: -2s;
    }

    &::before {
        content: '';
        position: absolute;
        width: 500px;
        height: 500px;
        background-image: conic-gradient(transparent, transparent, transparent, var(--portfolio-main));
        animation: rotate 4s linear infinite;
    }

    span {
        position: absolute;
        inset: 2px;
        background-color: var(--portfolio-header);
        border-radius: 5px;
        z-index: 1;
    }

    img {
        width: 100px;
        height: 100px;
        padding: 0.5rem;
        z-index: 2;
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>