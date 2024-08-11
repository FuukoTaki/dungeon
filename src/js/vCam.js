class VCam {

    // Must be called to init vCam.
    setInitialValues(delay, target) {

        this.delay = delay; // Tracking speed. 1 = no delay.
        this.x = target.x; // Starting X position.
        this.y = target.y; // Starting Y position.
        this.target = target;
        this.targetIndex = 0;
    }

    // This must be called in order to update vCam and track objectives.
    updateVCam(ctx, canvas, scale) {

        // Update target X and Y coordinates.
        this.targetX = canvas.width / 2 - (this.target.x) * scale - (this.target.width / 2) * scale;
        this.targetY = canvas.height / 2 - (this.target.y) * scale - (this.target.height / 2) * scale;

        // Update vCam coordinates with delay effect.
        this.x += (this.targetX - this.x) / this.delay;
        this.y += (this.targetY - this.y) / this.delay;

        // Apply vCam movement to canvas.
        ctx.translate(this.x, this.y);
    }

    changeTarget(target) {

        this.target = target;
    }

    changeDelay(delay) {

        this.delay = delay;
    }
}

export let vCam = new VCam();