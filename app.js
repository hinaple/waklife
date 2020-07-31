const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

const GROUND = SCREEN_HEIGHT / 2;

const bodyDOM = document.body;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, 1920, 1080);

let camera = [ 400, 200 ];

let player = {
    pos: [ 0, GROUND - 10 ], //x, y
    age: 0,
    size: [ 150, 300 ], //x, y
    force: [ 0, 0 ],
    gravityTime: 0,
};

let things = [];

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

class Thing {
    constructor(arg) {
        this.img = arg.img;
        this.pos = [ arg.posx, arg.posy ];
        this.size = [ arg.sizex, arg.sizey ];
    }
}

setInterval(work, 15);

function work() {
    rend();
    managePhysics();

    player.pos[0] += 10;
}

function rend() {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    //show environment
    ctx.fillRect(0, GROUND + camera[1], SCREEN_WIDTH, SCREEN_HEIGHT - GROUND);
    manageThings();

    //show player
    drawPlayer();
}

function drawPlayer() {
    ctx.fillStyle = "#000";
    ctx.fillRect(
        400,
        player.pos[1] - player.size[1] + camera[1],
        player.size[0],
        player.size[1]
    );
}

function manageThings() {
    for(let i = 0; i < things.length; i++) {
        if(things[i].pos[0] < player.pos[0] - SCREEN_WIDTH || things[i].pos[0] > player.pos[0] + SCREEN_WIDTH) continue;
        drawThing(i);
    }
}

function drawThing(index) {
    ctx.fillStyle = things[index].img;
    ctx.fillRect(
        camera[0] + things[index].pos[0] - player.pos[0],
        things[index].pos[1] + camera[1],
        things[index].size[0],
        things[index].size[1]
    );
}

async function doPlayerJump() {
    if(player.pos[1] < GROUND) return;
    player.force[0] -= 40;
}

function managePhysics() {
    player.pos[1] += player.force[0];
    player.force[0] += 3; //gravity

    let touch = didTouchThing();
    if(player.pos[1] >= GROUND) { //react of gravity
        player.force[0] = 0;
        player.pos[1] = GROUND;
    }
}

function didTouchThing() {
    let list = [];
    for(let i = 0; i < things.length; i++) {
        if(player.pos[0] + player.size[0] > things[i].pos[0] && player.pos[0] < things[i].pos[0] + things[i].size[0]) list.push(i);
    }
    return list;
}

things.push(new Thing({
    img: "blue",
    posx: 1000,
    posy: GROUND - 200,
    sizex: 500,
    sizey: 200
}));