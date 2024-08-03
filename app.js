let canvas;
let ctx;

let wPressed = false;
let sPressed = false;
let aPressed = false;
let dPressed = false;

let player;

const classesAvailable = {
    SOLDIER: "soldier",
    KNIGHT: "knight",
    TEMPLAR_KNIGHT: "templarKnight",
    SWORDSMAN: "swordsman",
    ARMORED_AXEMAN: "armoredAxeman",
    LANCER: "lancer",
    WIZARD: "wizard",
    PRIEST: "priest",
    ARCHER: "archer"
};

window.addEventListener("DOMContentLoaded", () => {

    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 300;

    player = new Player(classesAvailable.SWORDSMAN);
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
    });

    window.addEventListener("keyup", (e) => {

        if (e.key === "w") wPressed = false;
        if (e.key === "s") sPressed = false;
        if (e.key === "a") aPressed = false;
        if (e.key === "d") dPressed = false;
    });

    requestAnimationFrame(gameLoop);
});

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (wPressed) player.y -= 2;
    if (sPressed) player.y += 2;
    if (aPressed) player.x -= 2;
    if (dPressed) player.x += 2;

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

// -- COIN TOSS --

const coinResults = {
    NORMAL: "normal",
    BUFF: "buff",
    DEBUFF: "debuff",

    TAILS: "tails",
    HEADS: "heads"
};

function tossACoin() {

    let coinFlip = Math.floor(Math.random() * 2);
    return (coinFlip === 0) ? coinResults.TAILS : coinResults.HEADS;
}

function tossTwoCoins() {

    let coin1 = tossACoin();
    let coin2 = tossACoin();

    if (coin1 === coinResults.TAILS && coin2 === coinResults.TAILS)
        return coinResults.BUFF;
    if (coin1 === coinResults.HEADS && coin2 === coinResults.HEADS)
        return coinResults.DEBUFF;

    return coinResults.NORMAL;
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

class Player {

    constructor(classSelected) {

        // Class selected.
        this.classSelected = classSelected;

        // Core stats.
        this.hp = 12;
        this.attack = 2;
        this.attackSpeed = 60;
        this.critical = 0;
        this.defense = 0;
        this.movementSpeed = 2;
        this.debuffResistance = 0;
        this.wisdom = 0;

        // Add stats bonus.
        this.addClassBonus(classSelected);

        // Used to reset stats when modified.
        this.hpMax = this.hp;
        this.attackMax = this.attack;
        this.attackSpeedMax = this.attackSpeed;
        this.criticalMax = this.critical;
        this.defenseMax = this.defense;
        this.movementSpeedMax = this.movementSpeed;
        this.debuffResistanceMax = this.debuffResistance;
        this.wisdomMax = this.wisdom;

        // Variables.
        this.x = 0;
        this.y = 0;
        this.isAttacking = false;
        this.direction = "right";
    }

    addClassBonus(playerClass) {

        switch (playerClass) {

            case classesAvailable.SOLDIER:
                this.attack += 1;
                this.attackSpeed -= 6;
                break;

            case classesAvailable.KNIGHT:
                this.attack += 1;
                this.defense += 1;
                break;

            case classesAvailable.TEMPLAR_KNIGHT:
                this.hp += 6;
                this.wisdom += 1;
                break;

            case classesAvailable.SWORDSMAN:
                this.attackSpeed -= 12;
                this.critical += 1;
                break;

            case classesAvailable.ARMORED_AXEMAN:
                this.hp += 6;
                this.attack += 1;
                break;

            case classesAvailable.LANCER:
                this.hp += 6;
                this.movementSpeed += 2;
                break;

            case classesAvailable.WIZARD:
                this.movementSpeed += 1;
                this.debuffResistance += 4;
                break;

            case classesAvailable.PRIEST:
                this.movementSpeed += 1;
                this.wisdom += 2;
                break;

            case classesAvailable.ARCHER:
                this.movementSpeed += 1;
                this.critical += 1;
                break;
        }
    }
}