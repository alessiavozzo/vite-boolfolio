<script>

export default {
    name: 'ProjectCard',
    props: {
        project: Object,
        url: String
    },
    data() {
        return {

        }
    },
    mounted() {
        //console.log(colors);
    },

}





</script>



<template>


    <div class="card">

        <img v-if="project.project_image.startsWith('uploads')" :src="url + '/storage/' + project.project_image" alt="">
        <img v-else :src="project.project_image" alt="">

        <div class="card-body">
            <!-- project title -->
            <h4>
                {{ project.title }}
            </h4>

            <div class="description">
                {{ project.description }}
            </div>

            <!-- tech -->
            <div class="technologies fira-mono-regular">
                <span v-for="tech in project.technologies">
                    {{ tech.name }}
                </span>
            </div>

            <div class="try">
                <!-- <a href="">PROVA SINGLE PAGE</a> -->
                <!-- <router-link :to="`/projects/${project.slug}`">PROVA</router-link> -->
                <router-link :to="{ name: 'single-project', params: { slug: project.slug } }">PROVA</router-link>

            </div>

            <!-- link to github and site -->
            <div class="links">
                <a :href="project.github_link">
                    <i class="fa-brands fa-github fa-xl"></i>
                </a>
                <a :href="project.project_link">
                    <i class="fa-solid fa-arrow-up-right-from-square fa-xl"></i>
                </a>

            </div>

        </div>

    </div>


</template>



<style scoped>
.card {
    background-color: var(--portfolio-card);
    position: relative;
    /* border: 1px solid var(--portfolio-light); */
    border-radius: 5px;
    transition: all 0.5s;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-1rem);
        border: 1px solid var(--portfolio-light);
    }

    img {
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }

    .card-body {
        padding: 1rem;
        color: var(--portfolio-light);
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        h4 {
            padding-bottom: 1rem;
        }

        .description {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2rem;
            max-height: calc(1.2rem * 3);
            margin-bottom: 1rem;
            color: var(--portfolio-text-secondary);
        }

        .links {
            display: flex;
            justify-content: end;
            gap: 2rem;
            align-items: center;
            margin-top: auto;

            a {
                text-decoration: none;
                color: var(--portfolio-light);
                cursor: pointer;

                &:hover {
                    color: var(--portfolio-main);
                }
            }
        }

        .technologies {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            color: var(--portfolio-main);
            gap: 0.5rem;
            padding-bottom: 1rem;
            font-size: 0.8rem;

            span {
                border: 1px solid var(--portfolio-main);
                padding: 0.4rem;
                border-radius: 5px;
            }
        }
    }

    /* &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 98%;
        top: 2.5rem;
        right: 2rem;
        z-index: -1;
    } */
}


/* .card:hover::after {
    background: var(--portfolio-main);
    outline: 2px solid var(--portfolio-main);
} */
</style>