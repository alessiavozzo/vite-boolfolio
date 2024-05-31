<script>
import axios from 'axios';
import ProjectCard from "./components/ProjectCard.vue";
import AppHeader from "./components/AppHeader.vue";


export default {
  name: 'App',
  components: {
    ProjectCard,
    AppHeader
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

  <AppHeader />
  <main>
    <div class="container">
      <div class="row row-cols-3">
        <ProjectCard v-for="project in projects.data" :project="project" :url="base_api_url" />
        <!-- <div class="project" v-for="project in projects.data">{{ project.title }}</div> -->
      </div>
    </div>

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
          v-for="page in projects.last_page" @click="goToPage(base_api_url + base_projects_url + `?page=${page}`)">
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


  </main>
  <footer>footer</footer>

</template>

<style scoped></style>
