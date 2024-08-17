import { projectiles } from "./app.js";
import { spritesSRC } from "./loader.js";
import { Projectile } from "./projectile.js";

class Ability {

    constructor(name, description, effect) {

        this.name = name;
        this.description = description;
        this.effect = effect;
    }

    activateAbility(...params) {

        this.effect(...params);
    }
}

export const swordSlash = new Ability(
    "Sword Slash",
    "Deals damage based on Attack",
    (caster) => {
        console.log("Attacked.");
    }
);

export const leapingSlam = new Ability(
    "Leaping Slam",
    "Teleports to the nearest enemy, dealing AOE damage and stunning all enemies hit.",
    (caster, target) => {

        caster.x = target.x;
        caster.y = target.y;
    }
);

export const magicArrow = new Ability(
    "Magic Arrow",
    "Shoots a Magic Arrow, reducing Defense by 1 point on hit.",
    (caster) => {
        let direction = caster.direction;
        let arrow = new Projectile(
            spritesSRC["arrow1"],
            direction,
            caster.x + caster.width / 2 - 64,
            caster.y + caster.height / 2 - 64
        );
        projectiles.push(arrow);
    }
); 