class Animation {

    constructor(name, frames, position, loop, animationFinished) {

        this.name = name;
        this.frames = frames;
        this.position = position;
        this.loop = loop;
        this.animationFinished = animationFinished;
    }
}

export let classesAvailable = {
    SOLDIER: "soldier",
    KNIGHT: "knight",
    KNIGHT_TEMPLAR: "knight_templar",
    SWORDSMAN: "swordsman",
    ARMOREX_AXEMAN: "armored_axeman",
    LANCER: "lancer",
    WIZARD: "wizard",
    PRIEST: "priest",
    ARCHER: "archer"
};

const animationsAvailable = {

    soldier: {
        IDLE: new Animation("IDLE", 6, 0, true, false),
        WALKING: new Animation("WALKING", 8, 1, true, false),
        TAKING_DAMAGE: new Animation("TAKING_DAMAGE", 4, 5, false, false),
        DEATH: new Animation("DEATH", 4, 6, false, false),
        ATTACK1: new Animation("ATTACK1", 6, 2, false, false),
        ATTACK2: new Animation("ATTACK2", 6, 3, false, false),
        ATTACK3: new Animation("ATTACK3", 9, 4, false, false)
    },

    knight: {
        IDLE: new Animation("IDLE", 6, 0, true, false),
        WALKING: new Animation("WALKING", 6, 1, true, false),
        TAKING_DAMAGE: new Animation("TAKING_DAMAGE", 4, 6, false, false),
        DEATH: new Animation("DEATH", 4, 7, false, false),
        ATTACK1: new Animation("ATTACK1", 7, 2, false, false),
        ATTACK2: new Animation("ATTACK2", 10, 3, false, false),
        ATTACK3: new Animation("ATTACK3", 11, 4, false, false),
        BLOCKING: new Animation("BLOCKING", 4, 5, false, false)
    },

    knight_templar: {
        IDLE: new Animation("IDLE", 6, 0, true, false),
        WALKING: new Animation("WALKING", 8, 1, true, false),
        GUARD_WALKING: new Animation("GUARD_WALKING", 8, 2, true, false),
        TAKING_DAMAGE: new Animation("TAKING_DAMAGE", 4, 7, false, false),
        DEATH: new Animation("DEATH", 4, 8, false, false),
        ATTACK1: new Animation("ATTACK1", 7, 3, false, false),
        ATTACK2: new Animation("ATTACK2", 8, 4, false, false),
        ATTACK3: new Animation("ATTACK3", 11, 5, false, false),
        BLOCKING: new Animation("BLOCKING", 4, 6, false, false)
    },

    swordsman: {
        IDLE: new Animation("IDLE", 6, 0, true, false),
        WALKING: new Animation("WALKING", 8, 1, true, false),
        TAKING_DAMAGE: new Animation("TAKING_DAMAGE", 5, 5, false, false),
        DEATH: new Animation("DEATH", 4, 6, false, false),
        ATTACK1: new Animation("ATTACK1", 7, 2, false, false),
        ATTACK2: new Animation("ATTACK2", 15, 3, false, false),
        ATTACK3: new Animation("ATTACK3", 12, 4, false, false)
    },

    armored_axeman: {
        IDLE: new Animation("IDLE", 6, 0, true, false),
        WALKING: new Animation("WALKING", 8, 1, true, false),
        TAKING_DAMAGE: new Animation("TAKING_DAMAGE", 4, 5, false, false),
        DEATH: new Animation("DEATH", 4, 6, false, false),
        ATTACK1: new Animation("ATTACK1", 9, 2, false, false),
        ATTACK2: new Animation("ATTACK2", 9, 3, false, false),
        ATTACK3: new Animation("ATTACK3", 12, 4, false, false)
    }
};

export class Sprite {

    constructor(src, x, y, width, height, classSelected) {

        // Stats.
        this.movementSpeed = 4;

        // Standar variables.
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.classSelected = classSelected;
        this.animationsAvailable = animationsAvailable[classSelected];
        this.currentAnimation = this.animationsAvailable.IDLE;

        // Variables for animations.
        this.direction = "right";
        this.currentFrame = 0;

        // This adds a 8 ticks delay between all animations frames.
        this.framesMultiplier = 8;
        this.framesMultiplierMax = this.framesMultiplier;
    }

    changeClass(newClass) {

        this.classSelected = newClass;
        this.animationsAvailable = animationsAvailable[newClass];
        this.currentAnimation = this.animationsAvailable.IDLE;

        this.currentFrame = 0;
        this.framesMultiplier = 8;
        this.framesMultiplierMax = this.framesMultiplier;
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

                this.currentFrame = 0;
                if (!this.currentAnimation.loop) this.currentAnimation.animationFinished = true;
            }
        }

        // ---- ---- ---- ---- ---- ---- ---- ----
    }
}