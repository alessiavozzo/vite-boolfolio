<script>
import { state } from '../state';

export default {
    name: 'AppHeader',
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

    <header>


        <nav class="navbar">

            <div class="container">
                <div class="logo">
                    <img src="/img/AVlogo.svg" alt="">
                </div>

                <ul class="nav-right">
                    <li class="nav-item space-mono-regular" v-for="option in menu">
                        <router-link @click="scrollHandler(option.route)" :to="{ name: option.route }"
                            :class="{ active: $route.name === option.route }">{{ option.text
                            }}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>



<style scoped>
header {
    height: 80px;
    background-color: var(--portfolio-header);
    box-shadow: 0px 1px 6px 0.5px var(--portfolio-main);
    z-index: 10000000;
    position: fixed;
    width: 100%;

    .navbar {
        height: 100%;
        padding: 0.75rem;

        .container {
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .logo {
                height: 100%;

                img {
                    height: 100%;
                }
            }
        }

        .nav-right {
            list-style: none;
            display: flex;
            gap: 1rem;

            a {
                text-decoration: none;
                color: var(--portfolio-main);
                position: relative;
                display: inline-block;
                transition: all 0.3s;

                &::after {
                    content: '';
                    width: 5px;
                    height: 5px;
                    background-color: var(--portfolio-main);
                    position: absolute;
                    left: 50%;
                    bottom: -0.5rem;
                    opacity: 0;
                    transform: translateX(-50%);
                }

                &:hover {
                    color: var(--portfolio-light);
                    transform: translateY(-0.25rem);
                }

                &:hover::after {
                    opacity: 1;
                    color: var(--portfolio-main);
                }
            }

            .active {}
        }

    }
}
</style>