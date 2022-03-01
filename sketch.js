/* VARIABLES */
let POPULATION_SIZE = 300;
let GAME_WIDTH = 480;
let GAME_HEIGHT = 640;
let GROUND_SPEED = 1.5;

/* DO NOT MODIFY */
let GAME_STARTED = false;
let score = 0;
let bg;
let numbers = {};
let bird = {};
let base;
let gameOver;
let pipe = {};

let ground = [];
let obstacles = [];
let flappyBots = [];

/* P5 */
function preload() {
    loadImages();
}

function setup() {
    // set canvas size
    createCanvas(GAME_WIDTH, 640);

    // init vars
    ground.push(new Block(0, height - 100, 240, 100, base));
    ground.push(new Block(240, height - 100, 240, 100, base));
    ground.push(new Block(240 * 2, height - 100, 240, 100, base));

    // add in pipes
    obstacles.push(new Obstacle(GAME_WIDTH * 1.5));
    obstacles.push(new Obstacle(GAME_WIDTH * 2));
    obstacles.push(new Obstacle(GAME_WIDTH * 2.5));
    obstacles.push(new Obstacle(GAME_WIDTH * 3));


    for (let i = 0; i < POPULATION_SIZE; i++) {
        flappyBots.push(
            new Bird(
                GAME_WIDTH / 2, GAME_HEIGHT / 2,
                34, 24, [bird.mid, bird.up, bird.down]
            )
        );
    }
}

function draw() {
    cursor(ARROW);

    // draw bg
    background(0);
    drawBg();

    // draw pipes and ground
    for (let obstacle of obstacles) {
        obstacle.draw();
        for (let bot of flappyBots) {
            obstacle.hasCollided(bot);
        }
    }
    for (let block of ground) {
        block.draw();
        block.scroll();
    }

    // draw bots
    for (let i = 0; i < flappyBots.length; i++) {
        flappyBots[i].draw();
        if (GAME_STARTED) {
            flappyBots[i].update();
        }
        if (flappyBots[i].isDead()) {
            flappyBots.splice(i, 1);
        }
    }
}

/* EVENT LISTENERS */
function mouseClicked() {
    if (!GAME_STARTED) {
        GAME_STARTED = true;
    }
}

function mousePressed() {}

function mouseReleased() {}

function mouseDragged() {}

/* OTHER FUNCTIONS */
function loadImages() {
    bg = loadImage('assets/bg.png');
    numbers = {
        zero: loadImage('assets/0.png'),
        one: loadImage('assets/1.png'),
        two: loadImage('assets/2.png'),
        three: loadImage('assets/3.png'),
        four: loadImage('assets/4.png'),
        five: loadImage('assets/5.png'),
        six: loadImage('assets/6.png'),
        seven: loadImage('assets/7.png'),
        eight: loadImage('assets/8.png'),
        nine: loadImage('assets/9.png')
    };
    bird = {
        up: loadImage('assets/flappy-up.png'),
        down: loadImage('assets/flappy-down.png'),
        mid: loadImage('assets/flappy-mid.png')
    };
    base = loadImage('assets/base.png');
    gameOver = loadImage('assets/gameover.png');
    pipe = {
        up: loadImage('/assets/pipe-up.png'),
        down: loadImage('/assets/pipe-down.png')
    };
}

function findNearestPipe(bird, obs) {
    let options = [];
    for (let i = 0; i < obs.length; i++) {
        let dist = obs[i].pos.x - bird.pos.x;
        if (dist > -52) {
            options.push(obs[i]);
        }
    }
    let closest = options[0];
    for (let i = 1; i < options.length; i++) {
        if (options[i].pos.x - bird.pos.x < closest.pos.x - bird.pos.x) {
            closest = options[i];
        }
    }
    return closest;
}

function displayScore(score, x, y) {
    let res = score.toString();
    for (let i = 0; i < res.length; i++) {
        switch (res[i]) {
            case "1":
                image(numbers.one, x + i * 24, y, 24, 36);
                break;
            case "2":
                image(numbers.two, x + i * 24, y, 24, 36);
                break;
            case "3":
                image(numbers.three, x + i * 24, y, 24, 36);
                break;
            case "4":
                image(numbers.four, x + i * 24, y, 24, 36);
                break;
            case "5":
                image(numbers.five, x + i * 24, y, 24, 36);
                break;
            case "6":
                image(numbers.six, x + i * 24, y, 24, 36);
                break;
            case "7":
                image(numbers.seven, x + i * 24, y, 24, 36);
                break;
            case "8":
                image(numbers.eight, x + i * 24, y, 24, 36);
                break;
            case "9":
                image(numbers.nine, x + i * 24, y, 24, 36);
                break;
            default:
                image(numbers.zero, x + i * 24, y, 24, 36);
                break;
        }
    }
}

function drawBg() {
    image(bg, 0, 0, GAME_WIDTH, GAME_HEIGHT + 10);
}

function statsPanel() {
    noStroke();
    fill(0);
    rect(GAME_WIDTH, 0, GAME_WIDTH, GAME_HEIGHT);
}