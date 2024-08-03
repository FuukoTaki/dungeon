// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- ABILITY CONSTRUCTOR --

export class Ability {

    constructor(name, description, effect) {

        this.name = name;
        this.description = description;
        this.effect = effect;
    }

    activateAbility() {

        console.log(this.name);
        console.log(this.description);
        this.effect();
    }
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----