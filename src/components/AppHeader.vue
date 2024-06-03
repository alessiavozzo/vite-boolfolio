<script>
export default {
    name: 'AppHeader',
    data() {
        return {
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
                    <li class="nav-item" v-for="option in menu">
                        <router-link :to="{ name: option.route }">{{ option.text }}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>



<style scoped>
header {
    height: 80px;
    background-color: var(--portfolio-bg);
    box-shadow: 0px 1px 9px 1px var(--portfolio-main);
    z-index: 10000;
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
            }
        }

    }
}
</style>