<script>
import { state } from "../state.js"

export default {
    name: 'FavouriteProj',
    props: ['fav'],

    data() {
        return {
            state: state,

            typeValue: "",
            typeStatus: false,
            displayText: this.fav.title,
            typingSpeed: 100,
            erasingSpeed: 100,
            newTextDelay: 2000,
            charIndex: 0
        }
    },

    created() {
        /* imposto un ritardo prima di iniziare a scrivere con typeText */
        setTimeout(this.typeText, this.newTextDelay + 200);
    },

    methods: {
        typeText() {
            /* se la parola non è finita aggiungo una lettera a typevalue e gli do un ritardo per la scrittura della lettera successiva*/
            if (this.charIndex < this.displayText.length) {
                if (!this.typeStatus) {
                    this.typeStatus = true;
                }
                this.typeValue += this.displayText.charAt(this.charIndex);
                this.charIndex += 1;
                setTimeout(this.typeText, this.typingSpeed);

                /* se la parola è finita, metto un timer per iniziare a cancellare il testo */
            } else {
                this.typeStatus = false;
                setTimeout(this.eraseText, this.newTextDelay);
            }
        },

        eraseText() {
            /* finchè ci sono lettere da cancellare, levo una lettera per volta da typestring e metto il timer per cancellare la prossima lettera*/
            if (this.charIndex > 0) {
                if (!this.typeStatus) {
                    this.typeStatus = true;
                }
                this.typeValue = this.typeValue.substring(0, this.charIndex - 1);
                this.charIndex -= 1;
                setTimeout(this.eraseText, this.erasingSpeed);

                /* quando non ci sono più lettere da cancellare, metto il timer per iniziare a scrivere di nuovo */
            } else {
                this.typeStatus = false;
                setTimeout(this.typeText, this.typingSpeed + 1000);
            }
        }
    }
}
</script>

<template>
    <div class="favourite-info">

        <!-- image -->
        <div class="image">
            <img v-if="fav.project_image && fav.project_image.startsWith('uploads')"
                :src="state.base_api_url + '/storage/' + fav.project_image" alt="">
            <img v-else-if="fav.project_image" :src="fav.project_image" alt="">
        </div>

        <!-- text part -->
        <div class="text">

            <!-- title -->
            <h3 class="fira-mono-bold">
                <span class="typed-text">{{ typeValue }}</span>
                <span class="blinking-cursor">|</span>
                <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
            </h3>

            <!-- description -->
            <div class="description">
                {{ fav.description }}
            </div>

            <!-- techs -->
            <div class="technologies fira-mono-regular">
                <span v-for="tech in fav.technologies">
                    {{ tech.name }}
                </span>
            </div>

            <!-- link to github and site -->
            <div class="links">
                <a :href="fav.github_link">
                    <i class="fa-brands fa-github fa-xl"></i>
                </a>
                <a :href="fav.project_link">
                    <i class="fa-solid fa-arrow-up-right-from-square fa-xl"></i>
                </a>

            </div>
        </div>

    </div>
</template>



<style scoped>
.favourite-info {
    margin: 3rem 0;
    display: flex;
    align-items: center;

    .image {
        width: 50%;


        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
            position: relative;
            border: 1px solid var(--portfolio-light);
            filter: grayscale(1);
            transition: all 0.7s;
        }

        &:hover {
            outline: 1px solid var(--portfolio-main);
            outline-offset: 5px;
            border-radius: 5px;

            img {
                margin-left: 2rem;
                margin-top: -2rem;
                z-index: 2000;
                filter: grayscale(0);
                cursor: pointer;
                box-shadow: -7px 7px 14px 6px var(--portfolio-header);
            }
        }
    }

    .text {
        color: var(--portfolio-light);
        width: 40%;
        display: flex;
        flex-direction: column;
        margin-left: -3rem;
        gap: 1.5rem;
        z-index: 50;

        h3 {
            width: 75%;
            align-self: end;
            text-align: right;
        }

        .description {
            display: flex;
            flex-wrap: wrap;
            text-align: right;
            padding: 1rem;
            background-color: var(--portfolio-card);
            border-radius: 5px;
            border: 2px inset var(--portfolio-header);
            outline: 1px solid var(--portfolio-light);

        }

        .technologies {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            color: var(--portfolio-main);
            gap: 0.5rem;
            justify-content: end;
            font-size: 0.8rem;

            span {
                border: 1px solid var(--portfolio-main);
                padding: 0.4rem;
                border-radius: 5px;
            }
        }

        .links {
            display: flex;
            justify-content: end;
            gap: 2rem;
            align-items: center;

            a {
                text-decoration: none;
                color: var(--portfolio-light);
                cursor: pointer;

                &:hover {
                    color: var(--portfolio-main);
                }
            }
        }
    }
}


h3 {
    font-size: 1.6rem;
    padding-bottom: 1rem;
}
</style>