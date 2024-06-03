<script>
import axios from "axios";
import { state } from "../state.js";
export default {
    name: 'SingleProject',
    data() {
        return {
            state: state,
            project: {}
        }
    },
    methods: {
        getSingleProject(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response);
                })
        }

    },
    mounted() {
        let url = this.state.base_api_url + this.state.base_projects_url + '/' + this.$route.params.id;
        console.log(url);
        this.getSingleProject(url);
    }
}
</script>

<template>

</template>



<style scoped></style>