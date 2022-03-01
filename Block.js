class Block {
    constructor(x, y, w, h, img) {
        this.pos = createVector(x, y);
        this.size = createVector(w, h);
        this.img = img;
    }

    draw() {
        image(this.img, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    scroll() {
        this.pos.x -= GROUND_SPEED;
        if (this.pos.x + this.size.x < 0) {
            this.pos.x = GAME_WIDTH - 1;
        }
    }
}