import { Ability } from "./abilities.js";

export const classesAvailable = {
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

export class Player {

    constructor(classSelected, x, y) {

        // Class selected.
        this.classSelected = classSelected;
        // Store all player abilities.
        this.abilities = [];

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
        this.x = x;
        this.y = y;
        this.isAttacking = false;
        this.direction = "right";
    }

    loadSoldierAbilities() {

        let ability1 = new Ability(
            "On Guard!",
            "Increase <<Defense>> by 1 point.",
            () => {

                this.defense += 1;
                console.log(this.defense);
            }
        )

        let ability2 = new Ability(
            "Lesser Healing!",
            "Restore 2 points of <<HP>>.",
            () => {
                this.hp += 2;
                console.log(this.hp);
            }
        );

        this.abilities.push(ability1);
        this.abilities.push(ability2);
        console.log("Soldier abilities added.");
        console.log(this.abilities);
    }

    addClassBonus(playerClass) {

        switch (playerClass) {

            case classesAvailable.SOLDIER:
                this.attack += 1;
                this.attackSpeed -= 6;
                this.loadSoldierAbilities();
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