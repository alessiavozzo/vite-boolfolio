import { reactive } from "vue";

export const state = reactive({
    base_api_url: 'http://127.0.0.1:8000',
    base_projects_url: '/api/projects',
    fav_projects_url: '/api/favourites'


})

