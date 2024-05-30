<script>
import axios from 'axios';
export default {
  name: 'App',

  data() {
    return {
      projects: [],
      base_api_url: 'http://127.0.0.1:8000',
      base_posts_url: '/api/projects',
    }
  },

  methods: {
    call_API(url) {
      axios
        .get(url)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));
    }
  },

  mounted() {
    let url = this.base_api_url + this.base_posts_url;
    this.call_API(url);
  }
}
</script>

<template>

</template>

<style scoped></style>
