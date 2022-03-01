class Bird {
    constructor(x, y, w, h, img) {
        this.begin = false;
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0.5);
        this.size = createVector(w, h);
        this.img = img;
        this.imgIndex = 0;
        this.dead = false;
        this.score = 0;
        this.brain = new NeuralNetwork([4, 1]);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        let nearestPipe = findNearestPipe(this, obstacles);

        /* 
        inputs[6] = [
            x distance from nearest pipe,
            y top of nearest pipe,
            y bottom of nearest pipe,
            bird vertical velocity
        ]
        */
        let inputs = [
            nearestPipe.pos.x,
            this.pos.y - (nearestPipe.pos.y - 150),
            nearestPipe.pos.y - this.pos.y,
            this.vel.y
        ];
        this.brain.feedForward(inputs);

        // decision making
        if (this.brain.output()[0] > 0.5) {
            this.flap();
        }
    }

    draw() {

        // draw bird
        imageMode(CENTER);
        push();
        translate(this.pos.x, this.pos.y);
        rotate((this.dead) ? 180 : this.vel.y / 20);
        image(this.img[this.imgIndex], 0, 0, this.size.x, this.size.y);
        pop();
        imageMode(CORNER);

        // animate bird
        if (frameCount % 7 === 0 && !this.dead) {
            this.imgIndex++;
            if (GAME_STARTED)
                this.score++;
        }
        if (this.imgIndex > this.img.length - 1) {
            this.imgIndex = 0;
        }

        // check for top/bottom collision
        if (this.pos.y - this.size.y / 2 <= 0 ||
            this.pos.y + this.size.y / 2 >= GAME_HEIGHT - 100) {
            this.dead = true;
        }

        // stop for ground collision
        if (this.pos.y + this.size.y / 2 >= GAME_HEIGHT - 100) {
            this.acc = createVector(0, 0);
            this.vel = createVector(0, 0);
        }
    }

    flap() {
        if (!this.dead) {
            this.vel.y = -8;
        }
    }

    isDead() {
        return this.dead;
    }
}