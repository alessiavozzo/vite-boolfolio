<script>
import axios from 'axios';

import ProjectCard from "../components/ProjectCard.vue";

export default {
    name: 'AppProjects',
    components: {
        ProjectCard,
    },
    data() {
        return {
            projects: [],
            base_api_url: 'http://127.0.0.1:8000',
            base_projects_url: '/api/projects',
        }
    },

    methods: {
        getProjects(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response);
                    this.projects = response.data.projects;
                })
                .catch(error => console.log(error));
        },

        prevPage(url) {
            //console.log(url);
            this.getProjects(url);
        },

        nextPage(url) {
            //console.log(url);
            this.getProjects(url);
        },

        goToPage(url) {
            //console.log(url);
            this.getProjects(url);
        }
    },

    mounted() {
        let url = this.base_api_url + this.base_projects_url;
        this.getProjects(url);
    }
}
</script>

<template>
    <section id="projects">
        <div class="container">
            <h2>
                <i class="fa-solid fa-gear"></i>
                <span>MY PROJECTS</span>
                <i class="fa-solid fa-gear"></i>
            </h2>
            <div class="row">
                <div class="col-4" v-for="project in projects.data">
                    <ProjectCard :project="project" :url="base_api_url" />
                </div>

            </div>
        </div>
    </section>





    <nav aria-label="Page navigation">
        <ul class="pagination">

            <!-- prev -->
            <li class="page-item">
                <button class="page-link" aria-label="Previous" @click="prevPage(projects.prev_page_url)"
                    :disabled="projects.prev_page_url == null">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>

            <!-- pages -->
            <li class="page-item" aria-current="page" :class="{ 'active': page == projects.current_page }"
                v-for="page in projects.last_page"
                @click="goToPage(base_api_url + base_projects_url + `?page=${page}`)">
                <button class="page-link">{{ page }}</button>
            </li>

            <!-- next -->
            <li class="page-item">
                <button class="page-link" aria-label="Next" @click="nextPage(projects.next_page_url)"
                    :disabled="projects.next_page_url == null">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        </ul>
    </nav>
</template>



<style scoped>
#projects {
    padding-top: 80px;

    .container {
        max-width: 1200px;

        .row {
            gap: 3rem;
            justify-content: center;

            .col-4 {
                width: calc(((100% / 12) * 4) - 3rem);
            }
        }
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
</style>