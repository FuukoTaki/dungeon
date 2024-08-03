import { Player, classesAvailable } from "./player.js";
import { tossACoin, tossTwoCoins, coinResults } from "./coinToss.js";

let canvas;
let ctx;

let wPressed = false;
let sPressed = false;
let aPressed = false;
let dPressed = false;

let player;

window.addEventListener("DOMContentLoaded", () => {

    // Set Canvas and Ctx variables.
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    // Set canvas size.
    canvas.width = 400;
    canvas.height = 300;

    // Create player instance.
    player = new Player(
        classesAvailable.SOLDIER, // Class.
        20, // X.
        canvas.height / 2 - 10 // Y.
    );

    console.log(player);

    window.addEventListener("keydown", (e) => {

        if (e.key === "w") wPressed = true;
        if (e.key === "s") sPressed = true;

        if (e.key === "a") {

            aPressed = true;
            player.direction = "left";
        }

        if (e.key === "d") {

            dPressed = true;
            player.direction = "right";
        }

        if (e.key === "Enter") player.isAttacking = true;
        if (e.key === "j") player.abilities[0].activateAbility();
        if (e.key === "k") player.abilities[1].activateAbility();
    });

    window.addEventListener("keyup", (e) => {

        if (e.key === "w") wPressed = false;
        if (e.key === "s") sPressed = false;
        if (e.key === "a") aPressed = false;
        if (e.key === "d") dPressed = false;
    });

    // Start game loop.
    requestAnimationFrame(gameLoop);
});

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- GAME LOOP --

function gameLoop() {

    // Clear canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (wPressed) player.y -= player.movementSpeed;
    if (sPressed) player.y += player.movementSpeed;
    if (aPressed) player.x -= player.movementSpeed;
    if (dPressed) player.x += player.movementSpeed;

    if (player.isAttacking) {

        // Set hitbox direction.
        let xPos;
        if (player.direction === "left") xPos = player.x - 20;
        if (player.direction === "right") xPos = player.x + 20;

        // Draw attack hitbox.
        ctx.fillStyle = "yellow";
        ctx.fillRect(xPos, player.y, 20, 20);

        // Attack Speed tick.
        player.attackSpeed--;

        if (player.attackSpeed <= 0) {

            player.attackSpeed = player.attackSpeedMax;
            player.isAttacking = false;

            // Apply coin results to attack.
            let coinResult = tossTwoCoins();
            let damage;

            if (coinResult === coinResults.BUFF) {

                damage = player.attack + player.critical + 1;
                console.log("Critical hit! " + damage);
            }

            if (coinResult === coinResults.DEBUFF) {

                damage = player.attack - 1;
                console.log("Graze hit. " + damage);
            }

            if (coinResult === coinResults.NORMAL) {

                damage = player.attack;
                console.log("Normal hit. " + damage);
            }
        }
    }

    // Draw player.
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, 20, 20);

    // Draw puppet.
    ctx.fillStyle = "blue";
    ctx.fillRect(canvas.width / 2 - 10, canvas.height / 2 - 10, 20, 20);

    requestAnimationFrame(gameLoop);
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----