import { animationsAvailable } from "./animation.js";
import { swordSlash, leapingSlam, magicArrow } from "./abilities.js";

export let charactersAvailable = {
    // Humans.
    SOLDIER: "soldier",
    KNIGHT: "knight",
    KNIGHT_TEMPLAR: "knight_templar",
    SWORDSMAN: "swordsman",
    ARMOREX_AXEMAN: "armored_axeman",
    LANCER: "lancer",
    WIZARD: "wizard",
    PRIEST: "priest",
    ARCHER: "archer"

    // TODO: Monsters.
};

export class Sprite {

    constructor(src, x, y, width, height, characterSelected) {

        this.stats = {};
        this.abilities = [];

        // Standar variables.
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.characterSelected = characterSelected;
        this.animationsAvailable = animationsAvailable[characterSelected];
        this.currentAnimation = this.animationsAvailable.IDLE;

        // Variables for animations.
        this.direction = "right";
        this.currentFrame = 0;

        // This adds a 8 ticks delay between all animations frames.
        this.framesMultiplier = 8;
        this.framesMultiplierMax = this.framesMultiplier;

        this.addCharacterStats(this.characterSelected);
    }

    addCharacterAbilities(characterSelected) {

        switch (characterSelected) {

            case charactersAvailable.SOLDIER:
                this.abilities = [
                    swordSlash,
                    leapingSlam,
                    magicArrow
                ];
                break;
        }

        console.log("Abilities added.");
    }

    addCharacterStats(characterSelected) {

        // Initial stats.
        this.stats = {
            hp: 12,
            attack: 2,
            defense: 0,
            movementSpeed: 4,
            wisdom: 0,
            debuffResistance: 0
        };

        // Add bonus stats.
        switch (characterSelected) {

            case charactersAvailable.SOLDIER:
                this.stats.movementSpeed = 6;
                this.stats.debuffResistance = 4;
                break;

            case charactersAvailable.KNIGHT:
                this.stats.hp = 16;
                this.stats.defense = 1;
                break;

            case charactersAvailable.KNIGHT_TEMPLAR:
                this.stats.defense = 1;
                this.stats.wisdom = 2;
                break;

            case charactersAvailable.SWORDSMAN:
                this.stats.attack = 3;
                this.stats.movementSpeed = 6;
                break;

            case charactersAvailable.ARMOREX_AXEMAN:
                this.stats.attack = 3;
                this.stats.defense = 1;
                break;
        }

        console.log(this.stats);
    }

    changeCharacter(newCharacter) {

        this.characterSelected = newCharacter;
        this.animationsAvailable = animationsAvailable[newCharacter];
        this.currentAnimation = this.animationsAvailable.IDLE;

        this.currentFrame = 0;
        this.framesMultiplier = this.framesMultiplierMax;

        this.addCharacterStats(newCharacter);
        this.addCharacterAbilities(newCharacter);
    }

    switchAnimation(newAnimation) {

        if (this.currentAnimation.name === newAnimation.name) return;

        this.currentAnimation = this.animationsAvailable[newAnimation.name];
        this.currentFrame = 0;
        this.framesMultiplier = this.framesMultiplierMax;

        console.log(this.currentAnimation);
    }

    tick(ctx) {

        // ---- ---- ---- ---- ---- ---- ---- ----

        // -- DRAW ANIMATION & DIRECTION --

        if (this.direction === "right") {

            ctx.drawImage(
                this.src, // Image source.
                this.currentFrame * this.width, this.currentAnimation.position * this.height, // Spritesheet coordinates.
                this.width, this.height, // Size.
                this.x, this.y, // Canvas coordinates.
                this.width, this.height // Size.
            );
        }

        if (this.direction === "left") {

            ctx.save();
            ctx.scale(-1, 1);

            ctx.drawImage(
                this.src, // Image source.
                this.currentFrame * this.width, this.currentAnimation.position * this.height, // Spritesheet coordinates.
                this.width, this.height, // Size.
                -(this.x + this.width), this.y, // Canvas coordinates.
                this.width, this.height // Size.
            );

            ctx.restore();
        }

        // ---- ---- ---- ---- ---- ---- ---- ----

        // -- TICKS FOR NEXT ANIMATION FRAME --

        this.framesMultiplier--;
        if (this.framesMultiplier <= 0) {
            this.framesMultiplier = this.framesMultiplierMax;
            this.currentFrame++;
            if (this.currentFrame >= this.currentAnimation.frames) {
                if (this.currentAnimation.loop) this.currentFrame = 0;
                if (!this.currentAnimation.loop) {
                    this.currentFrame = this.currentAnimation.frames - 1;
                    this.currentAnimation.animationFinished = true;
                }
            }
        }

        // ---- ---- ---- ---- ---- ---- ---- ----
    }
}