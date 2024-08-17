import { spritesSRC, loadSpritesheets } from "./loader.js";
import { Sprite, charactersAvailable } from "./player.js";
import { vCam } from "./vCam.js";

let canvas;
let ctx;

let characterChangeSelect;
let characterSelected;

let scale = 0.6;
let fps = 60;
let lastTime = 0;
let interval = 1000 / fps;

let vCamDelay = 1;

export let player;
export let enemy;
let isAttacking = false;

export let projectiles = [];

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

    characterChangeSelect = document.getElementById("character-change-select");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    characterSelected = charactersAvailable.SOLDIER;

    loadSpritesheets();
});

export function initGame() {

    console.log("Init game...");

    player = new Sprite(
        spritesSRC["red_girl"],
        canvas.width / 2 - 128, canvas.height / 2 - 128,
        256, 256,
        "red_girl"
    );

    enemy = new Sprite(
        spritesSRC["swordsman"],
        canvas.width / 2 - 200, canvas.height / 2 - 200,
        400, 400,
        "swordsman"
    );

    player.addCharacterAbilities(player.characterSelected);

    vCam.setInitialValues(vCamDelay, player);

    window.addEventListener("resize", (e) => {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        console.log(`Screen Resized, W:${canvas.width} H:${canvas.height}`);
        console.log("Please restart game.");

    });

    characterChangeSelect.addEventListener("change", (e) => {

        console.log(characterChangeSelect.value);

        characterSelected = characterChangeSelect.value;
        player.src = spritesSRC[characterSelected];
        player.changeCharacter(characterSelected);

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
}

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

    projectiles.forEach(arrow => {
        if (arrow.direction === "left") arrow.x -= 32;
        if (arrow.direction === "right") arrow.x += 32;
        arrow.tick(ctx);
    });

    // enemy.tick(ctx);
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

        if (player.currentFrame === player.currentAnimation.frameOfActivation && player.currentAnimation.canTriggerAbility) {

            switch (player.characterSelected) {

                case charactersAvailable.SOLDIER:
                    if (player.currentAnimation.name === "ATTACK1") player.abilities[0].activateAbility(player);;
                    if (player.currentAnimation.name === "ATTACK2") player.abilities[1].activateAbility(player, enemy);
                    if (player.currentAnimation.name === "ATTACK3") player.abilities[2].activateAbility(player);
                    break;
            }

            player.currentAnimation.canTriggerAbility = false;
        }

        if (player.currentAnimation.animationFinished) {
            isAttacking = false;
            player.currentAnimation.animationFinished = false;
            player.currentAnimation.canTriggerAbility = true;
            player.switchAnimation(player.animationsAvailable.IDLE);
        }

        player.tick(ctx);

        return;
    }

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- MOVEMENT --

    let angularSpeed = player.stats.movementSpeed * Math.sqrt(2) / 2;
    let movementSpeed = player.stats.movementSpeed;

    if (spacePressed && (wPressed || sPressed || aPressed || dPressed) && player.animationsAvailable["GUARD_WALKING"] != undefined) {
        angularSpeed *= 0.2;
        movementSpeed *= 0.2;
    }

    /*
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
    */

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