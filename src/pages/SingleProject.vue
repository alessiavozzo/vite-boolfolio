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
                    if (response.data.success) {
                        console.log(response.data.response);
                        this.project = response.data.response;
                    }
                    else {
                        //console.log(this.$router);
                        this.$router.push({ name: 'not-found' });
                    }
                })
                .catch(error => console.log(error));
        }

    },
    mounted() {
        let url = this.state.base_api_url + this.state.base_projects_url + '/' + this.$route.params.slug;
        console.log(url);
        this.getSingleProject(url);
    }
}
</script>

<template>
    <div class="project-data">
        <div class="container">
            <div class="row">
                <div class="card">
                    {{ project.id }}
                    {{ project.title }}
                    <!-- {{ project.project_image }}
                    {{ state.base_api_url + '/storage/' + project.project_image }} -->


                    <img v-if="project.project_image && project.project_image.startsWith('uploads')"
                        :src="state.base_api_url + '/storage/' + project.project_image" alt="">
                    <img v-else-if="project.project_image" :src="project.project_image" alt="">
                </div>
            </div>
        </div>

    </div>

</template>



<style scoped>
.project-data {
    padding-top: 100px;
    color: white;

    .card {
        border: 1px solid white;
    }

}
</style>