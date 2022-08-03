class Bird {
    constructor(ctx, image, ticksPerFrame, numberOfFrames, width, height) {
        this.ctx = ctx;
        this.image = image;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = ticksPerFrame || 0;
        this.numberOfFrames = numberOfFrames || 1;
        this.width = width;
        this.height = height;
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
        this.ctx.clearRect(650, 150, this.width / this.numberOfFrames, this.height/2);
        contex.fillRect(650, 50, 200, 220);
        this.ctx.drawImage(this.image,
            this.frameIndex * this.width / this.numberOfFrames, 0,
            this.width / this.numberOfFrames, this.height,
            650, 50,
            this.width / this.numberOfFrames,
            this.height
        )
    }

    start() {
        let loop = () => {
            this.update();
            this.render();
            window.requestAnimationFrame(loop);
        }
        window.requestAnimationFrame(loop);
    }
}




