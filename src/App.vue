<script>
import axios from 'axios';
import ProjectCard from "./components/ProjectCard.vue";


export default {
  name: 'App',
  components: {
    ProjectCard
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
      console.log(url);
    },

    nextPage(url) {
      console.log(url);
    },

    goToPage(url) {
      console.log(url);
    }
  },

  mounted() {
    let url = this.base_api_url + this.base_projects_url;
    this.getProjects(url);
  }
}
</script>

<template>

  <header>header</header>
  <main>
    <div class="container">
      <div class="row row-cols-3">
        <ProjectCard v-for="project in projects.data" :project="project" />
        <!-- <div class="project" v-for="project in projects.data">{{ project.title }}</div> -->
      </div>
    </div>

    <nav aria-label="Page navigation">
      <ul class="pagination">

        <!-- prev -->
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous" @click="prevPage(projects.prev_page_url)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <!-- pages -->
        <li class="page-item" aria-current="page" v-for="page in projects.last_page"
          @click="goToPage(base_api_url + base_projects_url + `?page=${page}`)">
          <a class="page-link" href="#">{{ page }}</a>
        </li>

        <!-- next -->
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next" @click="nextPage(projects.next_page_url)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>


  </main>
  <footer>footer</footer>

</template>

<style scoped></style>
