<script>
import axios from "axios";
import { state } from "../state.js";
export default {
    name: 'BestProjects',
    data() {
        return {
            state: state,
            favourites: [],
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
    <div>
        {{ this.favourites }}
    </div>
</template>



<style scoped></style>