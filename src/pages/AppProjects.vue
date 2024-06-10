<script>
import axios from 'axios';
import { state } from '../state.js';
import { waveform } from 'ldrs';
/* import * as LDRS from 'ldrs' */
//import "ldrs/waveform";

import ProjectCard from "../components/ProjectCard.vue";

export default {
    name: 'AppProjects',
    components: {
        ProjectCard,
        /* 'l-waveform': waveform, */
    },
    data() {
        return {

            state: state,
            projects: [],
            currentPage: 1,
            lastPage: null,
            loading: true,

            typeValue: "",
            typeStatus: false,
            displayText: "MY PROJECTS",
            typingSpeed: 100,
            erasingSpeed: 100,
            newTextDelay: 2000,
            charIndex: 0,
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
                    this.loading = false;
                })
                .catch(error => console.log(error));
        },

        typeText() {
            /* se la parola non è finita aggiungo una lettera a typevalue e gli do un ritardo per la scrittura della lettera successiva*/
            if (this.charIndex < this.displayText.length) {
                if (!this.typeStatus) {
                    this.typeStatus = true;
                }
                this.typeValue += this.displayText.charAt(this.charIndex);
                this.charIndex += 1;
                setTimeout(this.typeText, this.typingSpeed);

                /* se la parola è finita, metto un timer per iniziare a cancellare il testo */
            } else {
                this.typeStatus = false;
            }
        },

        showMore() {
            if (this.currentPage < this.lastPage) {
                let nextPage = this.currentPage + 1;
                let url = `${state.base_api_url}${state.base_projects_url}?page=${nextPage}`
                this.getProjects(url);
            }
        }
        /* mi sa che mi serve un'altra chiamata per poter fare anche lo show less perchè mi serve un array temporaneo in cui salvare i dati aggiunti con showMore */
    },
    created() {
        setTimeout(this.typeText, this.newTextDelay + 200);

    },
    mounted() {
        /* console.log(waveform); */
        let url = state.base_api_url + state.base_projects_url;
        this.getProjects(url);

        waveform.register()
    }
}
</script>

<template>
    <section id="projects">
        <div class="container">
            <h3>
                <span class="typed-text space-mono-regular">{{ typeValue }}</span>
                <span class="blinking-cursor">|</span>
                <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
            </h3>
            <div class="row" v-if="!loading">
                <div class="col-4" v-for="project in projects">
                    <ProjectCard :project="project" :url="state.base_api_url" />
                </div>

            </div>
            <div class="row" v-else>
                <l-waveform size="45" stroke="4" speed="1" color="#47E5AC"></l-waveform>

            </div>
        </div>

        <div class="show-more">
            <button class="btn fira-mono-regular" v-if="currentPage < lastPage" @click="showMore">SHOW MORE</button>
        </div>

    </section>


</template>



<style scoped>
#projects {
    padding-top: 80px;

    .container {
        max-width: 1200px;

        h3 {
            padding: 4rem 0;
            font-size: 3rem;

            .typed-text {
                color: var(--portfolio-main);
            }
        }

        .row {
            gap: 3rem;
            justify-content: center;

            .col-4 {
                width: calc(((100% / 12) * 4) - 3rem);
            }
        }
    }

}



.show-more {
    padding: 3rem 0;
    text-align: center;
}
</style>