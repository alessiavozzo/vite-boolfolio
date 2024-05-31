<script>
import CreateBubble from '../assets/js/CreateBubble.js';

export default {
    name: 'AppJumbo',

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

            bubblesNumber: 80,


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
        }

    },

    mounted() {

        const canvas = this.$refs.canvas;
        this.canvasContext = canvas.getContext('2d');

        /* dimensioni canvas: larghezza e altezza della finestra */
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

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
    }
}



</script>

<template>
    <section id="jumbotron" style="width: 100%; height: 800px;">
        <canvas @mousemove="updateMousePosition" ref="canvas" style="width: 100%; height: 100%;"></canvas>
    </section>
</template>



<style scoped>
#jumbotron {
    background-color: var(--portfolio-bg);
    padding-top: 80px;
}
</style>