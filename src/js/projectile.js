export class Projectile {

    constructor(src, direction, x, y) {

        this.src = src;
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.width = 128;
        this.height = 128;
    }

    tick(ctx) {

        if (this.direction === "right") {

            ctx.drawImage(
                this.src, // Image source.
                0, 0, // Spritesheet coordinates.
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
                0, 0, // Spritesheet coordinates.
                this.width, this.height, // Size.
                -(this.x + this.width), this.y, // Canvas coordinates.
                this.width, this.height // Size.
            );

            ctx.restore();
        }
    }
}