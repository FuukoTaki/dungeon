import { initGame } from "./app.js";

// Object to store all spritesheet URL.
const spritesURL = {
    soldier: "./src/img/soldier.png",
    knight: "./src/img/knight.png",
    knight_templar: "./src/img/knight_templar.png",
    swordsman: "./src/img/swordsman.png",
    armored_axeman: "./src/img/armored_axeman.png",

    arrow1: "./src/img/projectiles/arrow1.png",

    red_girl: "./src/img/RedGirl.png"
};

// Object that will contain all spritesheet images once loaded.
export const spritesSRC = {};

export function loadSpritesheets() {

    console.log("Loading spritesheets...");

    // Loop trough all spritesheets.
    for (let spritesheet in spritesURL) {

        // Access to ech spritesheet item.
        if (spritesURL.hasOwnProperty(spritesheet)) {

            console.log("Spritesheet found.");
            console.log(`${spritesheet}: ${spritesURL[spritesheet]}`);

            // Create image to store image src.
            let image = new Image();
            image.src = spritesURL[spritesheet];

            // Wait until spritesheet is loaded.
            image.onload = () => {

                // Add spritesheet to SRC array container.
                spritesSRC[spritesheet] = image;

                console.log("Spritesheet loaded.");
                console.log(spritesSRC);

                // Check if all spritesheets are loaded.
                if (Object.keys(spritesSRC).length === Object.keys(spritesURL).length) {

                    console.log("All spritesheets loaded.");
                    console.log(spritesSRC);

                    // Call init game from app.js
                    initGame();
                }
            };
        }
    }
}