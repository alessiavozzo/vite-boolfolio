<script>
import { state } from '../state.js';
export default {
    name: 'AppNavigation',
    data() {
        return {
            state: state,
            menu: [
                {
                    text: 'Home',
                    route: 'home'
                },
                {
                    text: 'Projects',
                    route: 'projects'
                },
                {
                    text: 'About',
                    route: 'about'
                },
                {
                    text: 'Contacts',
                    route: 'contacts'
                },
            ]
        }
    },
    methods: {
        scrollHandler(route) {
            if (route === 'home') {
                state.addScrollListener();
            }
            else {
                state.removeScrollListener();
            }
        }
    }
}
</script>

<template>
    <div>
        <ul class="nav-right">
            <li class="nav-item space-mono-regular" :class="{ active: $route.name === option.route }"
                v-for="option in menu">
                <router-link @click="scrollHandler(option.route)" :to="{ name: option.route }">{{ option.text
                    }}</router-link>
            </li>
        </ul>

    </div>
</template>



<style scoped>
ul {
    position: fixed;
    right: 0;
    bottom: 0;
    font-size: 1.8rem;
    list-style: none;
    z-index: 1000000;
    padding: 2rem 0;
    color: var(--portfolio-light);

    @media (max-width: 768px) {
        display: none;
    }

    li {
        display: flex;
        align-items: baseline;
        justify-content: end;


        &::after {
            content: '';
            width: 4rem;
            height: 3px;
            background-color: currentColor;
            transition: all 0.5s;
        }

        &:hover {
            a {
                color: var(--portfolio-main);
                cursor: pointer;
            }
        }

        &:hover::after {
            width: 6rem;
            color: var(--portfolio-main);
        }

        a {
            text-decoration: none;
            color: var(--portfolio-light);
        }

        a.router-link-exact-active {
            color: var(--portfolio-main);
            cursor: pointer;
        }

        &.active::after {
            width: 6.5rem;
            color: var(--portfolio-main);
        }
    }
}
</style>