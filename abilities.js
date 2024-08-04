import { tossTwoCoins, coinResults } from "./coinToss.js";

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- ABILITIES CONSTRUCTOR --

export class Ability {

    constructor(name, description, effect) {

        this.name = name;
        this.description = description;
        this.effect = effect;
    }

    activate(...params) {

        this.effect(...params);
    }
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- ABILITIES AVAILABLES --

export let lesserHealing = new Ability(
    "Lesser Healing",
    "Restore HP equals to player Wisdom.",
    (target) => {

        let result = tossTwoCoins();
        let healingAmout;

        switch (result) {

            case coinResults.BUFF:
                healingAmout = target.wisdom + 1;
                break;
            case coinResults.DEBUFF:
                healingAmout = target.wisdom - 1;
                break;
            case coinResults.NORMAL:
                healingAmout = target.wisdom;
                break;
        }

        if (target.hp > target.hpMax) target.hp = target.hpMax;

        console.log(`HP restored (${healingAmout}).`);
    }
)

export let lesserProtection = new Ability(
    "Lesser Protection",
    "Increase player Defense by 1 point during 2 seconds.",
    (target) => {

        target.defense += 1;
        console.log(`Defense increased (1).`);

        setTimeout(() => {

            target.defense -= 1;
            console.log("Defense buff finished.");

        }, 2000);
    }
);

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----