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

export default CreateBubble;