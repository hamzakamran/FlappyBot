class Obstacle {
    constructor(x) {
        this.pos = createVector(
            x,
            random(GAME_HEIGHT / 4, GAME_HEIGHT - 150)
        );
    }

    draw() {
        image(pipe.up, this.pos.x, this.pos.y);
        image(pipe.down, this.pos.x, this.pos.y - (150 + 608));

        if (GAME_STARTED) {
            this.pos.x -= GROUND_SPEED;
        }
        if (this.pos.x + 52 < 0) {
            this.pos.x = GAME_WIDTH * 2;
            this.pos.y = random(GAME_HEIGHT / 4, GAME_HEIGHT - 150)
        }
    }

    hasCollided(bird) {
        // top pipe
        if (bird.pos.x + bird.size.x / 2 > this.pos.x &&
            bird.pos.y - bird.size.y / 2 < this.pos.y - 150 &&
            bird.pos.x - bird.size.x / 2 < this.pos.x + 52) {
            bird.dead = true;
        }
        // bottom pipe
        if (bird.pos.x + bird.size.x / 2 > this.pos.x &&
            bird.pos.y + bird.size.y / 2 > this.pos.y &&
            bird.pos.x - bird.size.x / 2 < this.pos.x + 52) {
            bird.dead = true;
        }
    }
}