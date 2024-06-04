import { reactive } from "vue";

export const state = reactive({
    base_api_url: 'http://127.0.0.1:8000',
    base_projects_url: '/api/projects',
    fav_projects_url: '/api/favourites',

    blockScroll(event) {
        window.scrollTo(0, 0);
    },
    removeScrollListener() {
        window.removeEventListener('scroll', this.blockScroll);
    },
    addScrollListener() {
        window.addEventListener('scroll', this.blockScroll);
    }
})

