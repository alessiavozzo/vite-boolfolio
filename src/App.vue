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
      base_posts_url: '/api/projects',
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
    }
  },

  mounted() {
    let url = this.base_api_url + this.base_posts_url;
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
  </main>
  <footer>footer</footer>

</template>

<style scoped></style>
