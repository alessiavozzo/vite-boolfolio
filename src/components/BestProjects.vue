<script>
import axios from "axios";
import { state } from "../state.js";
export default {
    name: 'BestProjects',
    data() {
        return {
            state: state,
            favourites: [],
            loading: true
        }
    },
    methods: {
        getFavourites(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response.data.fav_projects.data);
                    this.favourites = response.data.fav_projects.data;
                    console.log(this.favourites);
                    this.loading = false
                })
                .catch(error => console.log(error));
        }
    },
    mounted() {
        let url = state.base_api_url + state.fav_projects_url;
        this.getFavourites(url);
    }
}
</script>

<template>
    <section id="favourites">
        <div class="container">
            <h2>
                <i class="fa-solid fa-gear"></i>
                <span>SOME OF MY BEST WORKS</span>
                <i class="fa-solid fa-gear"></i>
            </h2>
            <div class="row" v-if="!loading">
                <div class="col-12" v-for="fav in favourites">
                    <div class="favourite-info">
                        <!-- {{ fav.title }} -->
                        <div class="image">

                            <img v-if="fav.project_image && fav.project_image.startsWith('uploads')"
                                :src="state.base_api_url + '/storage/' + fav.project_image" alt="">
                            <img v-else-if="fav.project_image" :src="fav.project_image" alt="">
                        </div>
                    </div>
                </div>

            </div>
            <div class="row" v-else>
                <l-waveform size="45" stroke="4" speed="1" color="#47E5AC"></l-waveform>
            </div>
        </div>

    </section>
    <div>

    </div>
</template>



<style scoped>
#favourites {
    padding-top: 80px;

    .container {
        max-width: 1200px;

        .row {
            .col-12 {
                width: calc(((100% / 12) * 12));
            }
        }

        h2 {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            padding: 4rem 0;
            color: var(--portfolio-light);

            &::before,
            &::after {
                content: '';
                width: 10%;
                height: 3px;
                display: block;
                background-color: currentColor;
                transition: all 1s;
            }

            .fa-gear {
                transition: all 5s;
            }
        }


        h2:has(span:hover) {

            &::before {
                width: 30%;
            }

            &::after {
                width: 30%;
            }

            .fa-gear {
                transform: rotate(360deg);
            }
        }

        .favourite-info {
            padding: 3rem 0;

            .image {
                width: 60%;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }

    }

}
</style>