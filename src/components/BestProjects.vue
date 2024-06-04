<script>
import axios from "axios";
import { state } from "../state.js";
import FavouriteProj from "./FavouriteProj.vue";
import { waveform } from 'ldrs';
export default {
    name: 'BestProjects',
    components: {
        FavouriteProj,
        /* 'l-waveform': waveform */
    },
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
        waveform.register();

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
                    <FavouriteProj :fav="fav" />
                </div>

            </div>
            <div class="row" v-else>
                <l-waveform size="45" stroke="4" speed="1" color="#47E5AC"></l-waveform>
            </div>
        </div>

        <div class="show-all">
            <router-link class="btn" :to="{ name: 'projects' }">
                Show all
            </router-link>
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


    }

    .show-all {
        text-align: center;
        padding: 3rem 0;

        a {
            text-decoration: none;
            color: var(--portfolio-main);
        }
    }

}
</style>