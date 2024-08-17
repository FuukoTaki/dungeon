class Animation {

    constructor(name, frames, position, loop, frameOfActivation) {

        this.name = name;
        this.frames = frames;
        this.position = position;
        this.loop = loop;
        this.frameOfActivation = frameOfActivation;

        this.animationFinished = false;
        this.canTriggerAbility = true;
    }
}

export const animationsAvailable = {

    red_girl: {
        IDLE: new Animation("IDLE", 6, 0, true),
        WALKING: new Animation("WALKING", 6, 1, true),
        ATTACK1: new Animation("ATTACK1", 6, 2, false),
        ATTACK2: new Animation("ATTACK2", 6, 4, false),
        ATTACK3: new Animation("ATTACK3", 4, 5, false)
    },

    soldier: {
        IDLE: new Animation("IDLE", 6, 0, true),
        WALKING: new Animation("WALKING", 8, 1, true),
        TAKING_DAMAGE: new Animation("TAKING_DAMAGE", 4, 5, false),
        DEATH: new Animation("DEATH", 4, 6, false),
        ATTACK1: new Animation("ATTACK1", 6, 2, false, 4),
        ATTACK2: new Animation("ATTACK2", 6, 3, false, 3),
        ATTACK3: new Animation("ATTACK3", 9, 4, false, 7)
    },

    knight: {
        IDLE: new Animation("IDLE", 6, 0, true, false),
        WALKING: new Animation("WALKING", 6, 1, true, false),
        TAKING_DAMAGE: new Animation("TAKING_DAMAGE", 4, 6, false, false),
        DEATH: new Animation("DEATH", 4, 7, false, false, true),
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
        DEATH: new Animation("DEATH", 4, 8, false, false, true),
        ATTACK1: new Animation("ATTACK1", 7, 3, false, false),
        ATTACK2: new Animation("ATTACK2", 8, 4, false, false),
        ATTACK3: new Animation("ATTACK3", 11, 5, false, false),
        BLOCKING: new Animation("BLOCKING", 4, 6, false, false)
    },

    swordsman: {
        IDLE: new Animation("IDLE", 6, 0, true, false),
        WALKING: new Animation("WALKING", 8, 1, true, false),
        TAKING_DAMAGE: new Animation("TAKING_DAMAGE", 5, 5, false, false),
        DEATH: new Animation("DEATH", 4, 6, false, false, true),
        ATTACK1: new Animation("ATTACK1", 7, 2, false, false),
        ATTACK2: new Animation("ATTACK2", 15, 3, false, false),
        ATTACK3: new Animation("ATTACK3", 12, 4, false, false)
    },

    armored_axeman: {
        IDLE: new Animation("IDLE", 6, 0, true, false),
        WALKING: new Animation("WALKING", 8, 1, true, false),
        TAKING_DAMAGE: new Animation("TAKING_DAMAGE", 4, 5, false, false),
        DEATH: new Animation("DEATH", 4, 6, false, false, true),
        ATTACK1: new Animation("ATTACK1", 9, 2, false, false),
        ATTACK2: new Animation("ATTACK2", 9, 3, false, false),
        ATTACK3: new Animation("ATTACK3", 12, 4, false, false)
    }
};