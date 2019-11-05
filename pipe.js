var pipe = function (game) {
    this.game = game;
    this.image = null;
    this.loaded = false;
    this.x = 300;
    this.y = 320;

    var self = this;

    this.init = function () {
        this.loadImage();
    }

    this.loadImage = function () {
        this.image = new Image();
        this.image.onload = function () {
            self.loaded = true;
            console.log('pipe image loaded')

        }
        this.image.src = 'images/pipe.png';
    }

    this.update = function () {
        if (this.game.gameOver) {
            return;
        }
        this.x -= 2;
        if (this.x == -54) {
            this.x = 300;
            this.y = Math.floor((Math.random() * 200)+200);
        }
    }

    this.draw = function () {
        // console.log('drawing bg');
        if (this.loaded == false) {
            return;
        }
        // console.log("draw");
        self.game.context.drawImage(this.image, this.x, this.y-150-320);
        self.game.context.drawImage(this.image, this.x, this.y);
    }
}