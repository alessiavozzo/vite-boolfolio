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
            currentPage: 1,
            lastPage: null
        }
    },

    methods: {
        getProjects(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response);
                    console.log(response.data.projects);
                    /* se levo ... mi aggiunge tutto l'array dentro l'array, io voglio elemento per elemento */
                    this.projects.push(...response.data.projects.data);
                    console.log(this.projects);
                    this.currentPage = response.data.projects.current_page;
                    this.lastPage = response.data.projects.last_page;
                })
                .catch(error => console.log(error));
        },

        showMore() {
            if (this.currentPage < this.lastPage) {
                let nextPage = this.currentPage + 1;
                let url = `${this.base_api_url}${this.base_projects_url}?page=${nextPage}`
                this.getProjects(url);
            }
        }
        /* mi sa che mi serve un'altra chiamata per poter fare anche lo show less perchè mi serve un array temporaneo in cui salvare i dati aggiunti con showMore */
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
                <div class="col-4" v-for="project in projects">
                    <ProjectCard :project="project" :url="base_api_url" />
                </div>

            </div>
        </div>

        <div class="show-more">
            <button class="btn" v-if="currentPage < lastPage" @click="showMore">Show more</button>
        </div>

    </section>


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

.show-more {
    padding-top: 3rem;
    text-align: center;
}

.btn {
    padding: 1rem 2rem;
    border: 1px solid var(--portfolio-main);
    border-radius: 5px;
    color: var(--portfolio-main);
    background-color: transparent;
    cursor: pointer;

    &:hover {
        background-color: var(--portfolio-main-lighter);
    }
}
</style>