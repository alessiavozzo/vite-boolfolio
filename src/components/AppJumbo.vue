<script>
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

        /* costruttore */
        class CreateBubble {
            constructor(bubble, canvasContext, mouse) {
                this.x = bubble.x;
                this.y = bubble.y;
                this.dx = bubble.dx;
                this.dy = bubble.dy;
                this.radius = bubble.radius;
                this.minRadius = bubble.radius;
                this.maxRadius = bubble.radius * 2;
                this.color = bubble.color;
                this.canvasContext = canvasContext;
                this.mouse = mouse;
            }

            calcColor() {
                const opacity = 0.5;

                /* calcolo il rapporto di crescita della bolla e ottengo una frazione che va da 0 a 1, se il raggio = al raggio minimo, avrò intensità 0, se è = al raggio massimo che può avere la bolla, allora l'intensità sarà 1 ->cambia colore in base all'intensità */
                const intensityChange = (this.radius - this.minRadius) / (this.maxRadius - this.minRadius);

                /* colore di partenza della bolla */
                const bubbleColor =
                {
                    r: 48,
                    g: 82,
                    b: 168
                };

                /* colore della bolla quando ci passo sopra */
                const hoverColor =
                {
                    r: 0,
                    g: 234,
                    b: 150
                };

                /* devo calcolare i valori intermedi per r, g e b per quando fa la transizione. Formula generica: media=primo + intensità(ultimo - primo). L'intensità del colore va da 0 a 1 e cambia in base alla dimensione della bolla */
                const r = Math.round(bubbleColor.r + intensityChange * (hoverColor.r - bubbleColor.r));
                const g = Math.round(bubbleColor.g + intensityChange * (hoverColor.g - bubbleColor.g));
                const b = Math.round(bubbleColor.b + intensityChange * (hoverColor.b - bubbleColor.b));
                return `rgba(${r},${g},${b},${opacity})`
            }

            drawBubble() {
                /* devo disegnare la bolla:
                -beginPath() ->inizio a disegnare ->va chiamato prima di disegnare sul canvas
                -arc() disegna un arco -> devo dare le coordinate del centro dell'arco, il raggio, l'angolo di inizio e l'angolo di fine in radianti e volendo anche il senso di disegno orario o antiorario
                -fillStyle è una proprietà che imposta lo stile di riempimento (colore, gradiente o pattern) per quando chiamo fill()
                -fill() riempie la bolla
                */
                this.canvasContext.beginPath();
                this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

                const fillingColor = this.calcColor();
                this.canvasContext.fillStyle = fillingColor;
                this.canvasContext.fill();
            }

            update() {

                /* se la bolla supera il bordo dx o sx, inverte la direzione (* -1) -> devo invertire la velocità non la coordinata*/
                if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                    this.dx = this.dx * -1;
                }
                /* idem ma per su e giù */
                if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                    this.dy = this.dy * -1;
                }

                /* moto rettilineo uniforme: devo sommare la velocità sull'asse x alla coordinata x e la velocità sull'asse y alla coordinata y -> this.x e this.y sono le posizioni iniziali, this.dx e this.dy sono le velocità, il tempo non è esplicitato -> sf-s0 = vt -> esplicito per posizione finale che è quella che voglio renderizzare: sf=vt+s0 -> assumendo t=1, sf=v+s0 -> this.x = this.dx + this.x*/
                this.x += this.dx
                this.y += this.dy

                /* aggiorno la posizione e controllo se c'è il mouse vicino e in base a quello aumenta o diminuisce il raggio della bolla, quindi ridisegno la bolla */
                this.changeRadiusOnMouseProximity()
                this.drawBubble()
            }

            changeRadiusOnMouseProximity() {
                /* metto una distanza di 50 px entro cui viene tenuta in considerazione la posizione del mouse rispetto alla bolla in ogni direzione */
                if (this.mouse.x - this.x < 50 && this.mouse.x - this.x > -50 && this.mouse.y - this.y < 50 && this.mouse.y - this.y > -50) {
                    /* se il raggio è inferiore al raggio massimo, allora aumenta gradualmente di 1 */
                    if (this.radius < this.maxRadius) {
                        this.radius += 1
                    }
                }
                /* se la bolla è fuori dalla distanza dei 50px e il raggio della bolla > del raggio minimo esistente, allora diminuisce gradualmente di 1 */
                else if (this.radius > this.minRadius) {
                    this.radius -= 1
                }
            }

        }

        const canvas = this.$refs.canvas;
        this.canvasContext = canvas.getContext('2d');

        /* dimensioni canvas: larghezza e altezza della finestra */
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        /* genero le bolle con un raggio casuale */
        for (let i = 0; i < this.bubblesNumber; i++) {
            let radius = this.randomNumber(5, 20);
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
    <div class="try" style="width: 100%; height: 800px;">
        <canvas @mousemove="updateMousePosition" ref="canvas" style="width: 100%; height: 100%;"></canvas>
    </div>
</template>



<style scoped></style>