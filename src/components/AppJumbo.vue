<script>
import { ping } from 'ldrs';
import CreateBubble from '../assets/js/CreateBubble.js';

export default {
    name: 'AppJumbo',
    emits: ['scrollToNextSection'],

    data() {
        return {
            /* le mie bolle vanno qua */
            bubbles: [],

            /* le coordinate del mouse di partenza, che poi verranno definite e aggiornate in base al mousemove che ho messo sul canvas nel template */
            mouse: {
                x: null,
                y: null
            },

            /* mi serve il contesto del canvas per poter fare la grafica 2D sul tag canvas. E' un oggetto che mi dà accesso ai metodi beginPath(), arc(), fill() etc così posso disegnarci le palline*/
            canvasContext: null,

            bubblesNumber: 250,
            animatePentagon: false,

            jumboHeight: 0,


            typeValue: "",
            typeStatus: false,
            displayText: `Hello 👋 <br>I'm <span style="color:#47E5AC">Alessia Vozzo</span><br><span style="color:#8892B0; font-size: 2.5rem">lorem lorem lorem lorem lorem lorem lorem lorem</span>`,
            typingSpeed: 60,
            newTextDelay: 2000,
            charIndex: 0
        }
    },
    methods: {

        randomNumber(min, max) {
            return Math.random() * (max - min) + min;
        },

        /* aggiorna le coordinate x e y del mouse, viene chiamata col mousemove quindi intercetta il movimento del mouse e a ogni movimento clientX mi dà la x (rispetto all'angolo in alto a sx della pagina), clientY la y -> sono due proprietà dell'evento mousemove. Così assegno le coordinate x e y al mouse*/
        updateMousePosition(e) {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        },

        animateBubble() {
            /* requestAnimationFrame è una funzione di js che pianifica l'esecuzione di una funzione prima del successivo loop di rendering -> si usa per fare le animazioni nel browser-> praticamente devo creare un loop chiamando di continuo requestAnimationFrame e animateBubble() in modo che venga aggiornata di continuo */
            window.requestAnimationFrame(this.animateBubble);

            /* pulisco il canvas prima di ridisegnare le bolle -> serve per dare fluidità (thx google)*/
            this.canvasContext.clearRect(0, 0, innerWidth, innerHeight)
            for (let i = 0; i < this.bubbles.length; i++) {
                /* per ogni bolla dell'array chiamo update() che aggiorna le coordinate della bolla e la disegna nella nuova posizione aggiornata */
                this.bubbles[i].update();
            }
        },

        /* devo ridimensionare il canvas quando ridimensiono la finestra e anche le bolle devono restare all'interno del canvas ridimensionato */
        resizeCanvas() {
            const canvas = this.$refs.canvas;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            for (let i = 0; i < this.bubbles.length; i++) {
                this.bubbles[i].x = this.randomNumber(this.bubbles[i].radius * 2, canvas.width - this.bubbles[i].radius * 2);
                this.bubbles[i].y = this.randomNumber(this.bubbles[i].radius * 2, canvas.height - this.bubbles[i].radius * 2);
            }
        },


        blockScroll(event) {
            window.scrollTo(0, 0);
        },
        removeScrollListener() {
            window.removeEventListener('scroll', this.blockScroll);
        },

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
            }
        },

    },

    created() {
        /* imposto un ritardo prima di iniziare a scrivere con typeText */
        setTimeout(this.typeText, this.newTextDelay + 3500);
    },

    mounted() {
        ping.register()

        const canvas = this.$refs.canvas;
        this.canvasContext = canvas.getContext('2d');

        /* dimensioni canvas: larghezza e altezza della finestra */
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.jumboHeight = canvas.height

        /* genero le bolle con un raggio casuale */
        for (let i = 0; i < this.bubblesNumber; i++) {
            let radius = this.randomNumber(10, 35);
            let diameter = radius * 2;

            /*  */
            let bubble = {
                /* x e y sono le coordinate iniziali, che sono un numero casuale tra la larghezza/altezza della finestra e il diametro. Devo sottratte il diametro alla larghezza/altezza della finestra sennò potrebbero spawnare bolle sui bordi, tagliate a metà e che non rimbalzano */
                radius: radius,
                x: this.randomNumber(diameter, window.innerWidth - diameter),
                y: this.randomNumber(diameter, window.innerHeight - diameter),
                dx: this.randomNumber(-1, 1),
                dy: this.randomNumber(-1, 1),
            }

            /* pusho la bolla nell'array di bolle */
            this.bubbles.push(
                new CreateBubble(bubble, this.canvasContext, this.mouse)
            )
        }
        /* faccio partire l'animazione delle bolle */
        this.animateBubble()

        /* quando ridimensiono la finestra, risponde la funzione resizeCanvas */
        window.addEventListener('resize', this.resizeCanvas);
        //this.resizeCanvas();



        /* animazione pentagono che entra */
        setTimeout(() => {
            this.animatePentagon = true;
        }, 1000);

        /* blocco lo scroll */
        window.addEventListener('scroll', this.blockScroll);
    },

}



</script>

<template>
    <section id="jumbotron">
        <canvas @mousemove="updateMousePosition" ref="canvas" style="width: 100%; height: 100%;"></canvas>

        <div class="presentation">
            <div class="pentagon" :class="{ 'animate-pentagon': animatePentagon }">
                <img src="https://picsum.photos/600/600" alt="">
            </div>

            <div class="name">
                <h1 class="fira-mono-bold">
                    <span class="typed-text" v-html="typeValue"></span>
                    <span class="blinking-cursor">|</span>
                    <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
                </h1>
            </div>

        </div>

        <button class="scrollBtn btn space-mono-regular" @click="removeScrollListener(); $emit('scrollToNextSection')">
            <span>FIND OUT MORE</span>
            <l-ping size="35" speed="2" color="#47E5AC"></l-ping>
        </button>
    </section>
</template>



<style scoped>
#jumbotron {
    background-color: var(--portfolio-bg);
    padding-top: 80px;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;

    canvas {
        z-index: 20;
        position: relative;
    }

    .presentation {
        position: absolute;
        top: 0;
        right: 0;
        padding-top: 200px;
        width: 85%;
        margin: auto;
        display: flex;
        justify-content: start;
        gap: 4rem;

        .pentagon {
            width: 500px;
            height: 476.19px;
            clip-path: polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%);
            z-index: 25;
            transform: translateX(100vw) rotate(0deg);
            transition: transform 3s ease;
            position: relative;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: filter 0.5s;
            }

            &:hover img {
                filter: grayscale(0);
            }

        }

        .animate-pentagon {
            transform: translateX(0%) rotate(-360deg);

        }

        .name {
            width: 60%;
            display: flex;
            flex-wrap: wrap;
            align-self: start;
            justify-content: end;

            h1 {
                font-size: 5rem;
                position: relative;
                z-index: 2000;
                align-self: end;
                text-align: right;
                color: var(--portfolio-light);


            }
        }
    }

    .scrollBtn {
        position: absolute;
        left: 50%;
        bottom: 5%;
        transform: translateX(-50%);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }


}
</style>