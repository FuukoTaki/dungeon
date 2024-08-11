import { Sprite, classesAvailable } from "./player.js";
import { vCam } from "./vCam.js";

let canvas;
let ctx;

let classChangeSelect;
let classSelected;

let scale = 0.6;
let fps = 60;
let lastTime = 0;
let interval = 1000 / fps;

let vCamDelay = 1;

let player;
let imgSRC;
let isAttacking = false;

// Movement keys.
let wPressed = false;
let sPressed = false;
let aPressed = false;
let dPressed = false;

// Attack keys.
let hPressed = false;
let jPressed = false;
let kPressed = false;
let lPressed = false;
let spacePressed = false;

window.addEventListener("DOMContentLoaded", () => {

    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    classChangeSelect = document.getElementById("class-change-select");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    classSelected = classesAvailable.SOLDIER;

    imgSRC = new Image();
    imgSRC.src = `./src/img/${classSelected}.png`;

    player = new Sprite(
        imgSRC,
        canvas.width / 2 - 200, canvas.height / 2 - 200,
        400, 400,
        classSelected
    );

    vCam.setInitialValues(vCamDelay, player);

    classChangeSelect.addEventListener("change", (e) => {

        console.log(classChangeSelect.value);

        classSelected = classChangeSelect.value;
        imgSRC.src = `./src/img/${classSelected}.png`;
        player.src = imgSRC;

        player.changeClass(classSelected);

        console.log(player.src);
    });

    window.addEventListener("wheel", (e) => {

        e.preventDefault();

        if (e.deltaY < 0) scale += 0.1;
        if (e.deltaY > 0) scale -= 0.1;
        if (scale < 0.4) scale = 0.4;
        if (scale > 4) scale = 4;

        scale = parseFloat(scale.toFixed(1));
        console.log("Scale: " + scale);

        // Apply zoom to all items on canvas.
        let auxDelay = vCam.delay;
        vCam.delay = 1;
        vCam.updateVCam(ctx, canvas, scale);
        ctx.scale(scale, scale);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        vCam.delay = auxDelay;

    }, { passive: false });

    window.addEventListener("keydown", (e) => {

        if (e.key === "w") wPressed = true;
        if (e.key === "s") sPressed = true;
        if (e.key === "a") aPressed = true;
        if (e.key === "d") dPressed = true;

        if (e.key === "h") hPressed = true;
        if (e.key === "j") jPressed = true;
        if (e.key === "k") kPressed = true;
        if (e.key === "l") lPressed = true;
        if (e.key === " ") spacePressed = true;
    });

    window.addEventListener("keyup", (e) => {

        if (e.key === "w") wPressed = false;
        if (e.key === "s") sPressed = false;
        if (e.key === "a") aPressed = false;
        if (e.key === "d") dPressed = false;

        if (e.key === "h") hPressed = false;
        if (e.key === "j") jPressed = false;
        if (e.key === "k") kPressed = false;
        if (e.key === "l") lPressed = false;
        if (e.key === " ") spacePressed = false;
    });

    requestAnimationFrame(gameLoop);
});

// ---- ---- ---- ---- ---- ---- ---- ----

// -- GAME LOOP --

function gameLoop(currentTime) {

    const deltaTime = currentTime - lastTime;

    if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval);
        gameLoopController();
    }

    requestAnimationFrame(gameLoop);
}

function gameLoopController() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    vCam.updateVCam(ctx, canvas, scale);
    ctx.scale(scale, scale);

    // ---- ---- ---- ---- ---- ---- ---- ----

    ctx.fillStyle = "green";
    ctx.fillRect(300, 300, 100, 100);

    playerController();

    // ---- ---- ---- ---- ---- ---- ---- ----

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// ---- ---- ---- ---- ---- ---- ---- ----

// -- PLAYER CONTROLLER --

function playerController() {

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- ATTACK --

    if (hPressed && player.animationsAvailable["BLOCKING"] != undefined) isAttacking = true;
    if (jPressed && player.animationsAvailable["ATTACK1"] != undefined) isAttacking = true;
    if (kPressed && player.animationsAvailable["ATTACK2"] != undefined) isAttacking = true;
    if (lPressed && player.animationsAvailable["ATTACK3"] != undefined) isAttacking = true;

    if (isAttacking) {

        if (jPressed && player.currentAnimation.name != "ATTACK2" && player.currentAnimation.name != "ATTACK3" && player.currentAnimation.name != "BLOCKING") {
            player.switchAnimation(player.animationsAvailable.ATTACK1);
        } else if (kPressed && player.currentAnimation.name != "ATTACK1" && player.currentAnimation.name != "ATTACK3" && player.currentAnimation.name != "BLOCKING") {
            player.switchAnimation(player.animationsAvailable.ATTACK2);
        } else if (lPressed && player.currentAnimation.name != "ATTACK1" && player.currentAnimation.name != "ATTACK2" && player.currentAnimation.name != "BLOCKING") {
            player.switchAnimation(player.animationsAvailable.ATTACK3);
        } else if (hPressed && player.currentAnimation.name != "ATTACK1" && player.currentAnimation.name != "ATTACK2" && player.currentAnimation.name != "ATTACK3") {
            player.switchAnimation(player.animationsAvailable.BLOCKING);
        }

        if (player.currentAnimation.animationFinished) {
            isAttacking = false;
            player.currentAnimation.animationFinished = false;
            player.switchAnimation(player.animationsAvailable.IDLE);
        }

        player.tick(ctx);

        return;
    }

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- MOVEMENT --

    let angularSpeed = player.movementSpeed * Math.sqrt(2) / 2;
    let movementSpeed = player.movementSpeed;

    if (spacePressed && (wPressed || sPressed || aPressed || dPressed) && player.animationsAvailable["GUARD_WALKING"] != undefined) {
        angularSpeed *= 0.2;
        movementSpeed *= 0.2;
    }

    if (wPressed && aPressed) {
        player.y -= angularSpeed;
        player.x -= angularSpeed;
    } else if (wPressed && dPressed) {
        player.y -= angularSpeed;
        player.x += angularSpeed;
    } else if (sPressed && aPressed) {
        player.y += angularSpeed;
        player.x -= angularSpeed;
    } else if (sPressed && dPressed) {
        player.y += angularSpeed;
        player.x += angularSpeed;
    } else if (wPressed) {
        player.y -= movementSpeed;
    } else if (sPressed) {
        player.y += movementSpeed;
    } else if (aPressed) {
        player.x -= movementSpeed;
    } else if (dPressed) {
        player.x += movementSpeed;
    }

    if (aPressed) {
        player.direction = "left";
    } else if (dPressed) {
        player.direction = "right";
    }

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- ANIMATIONS --

    if (spacePressed && (wPressed || sPressed || aPressed || dPressed) && player.animationsAvailable["GUARD_WALKING"] != undefined) {
        player.switchAnimation(player.animationsAvailable.GUARD_WALKING);
    } else {
        if (wPressed || sPressed || aPressed || dPressed) player.switchAnimation(player.animationsAvailable.WALKING);
        if (!wPressed && !sPressed && !aPressed && !dPressed) player.switchAnimation(player.animationsAvailable.IDLE);
    }

    player.tick(ctx);

    // ---- ---- ---- ---- ---- ---- ---- ----
}

function checkCollision(obj1, obj2) {

    const left1 = obj1.x;
    const right1 = obj1.x + obj1.width;
    const top1 = obj1.y;
    const bottom1 = obj1.y + obj1.height;

    const left2 = obj2.x;
    const right2 = obj2.x + obj2.width;
    const top2 = obj2.y;
    const bottom2 = obj2.y + obj2.height;

    if (left1 < right2 && right1 > left2 && top1 < bottom2 && bottom1 > top2) {
        return true;
    } else {
        return false;
    }
}