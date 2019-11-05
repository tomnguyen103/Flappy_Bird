var bird = function(game){
    this.game = game;
    this.images = [];
    this.img1Loaded = false;
    this.img2Loaded = false;
    this.img3Loaded = false;
    this.currentImage = null;
    this.currentImageIndex = 0;

    this.currentFrame = 0;

    this.x = 70;
    this.y = 0;
    this.speedY = 0;
    this.acceleration = 1.5;

    this.direction = 'down';

    self = this;

    this.init = function(){
        this.loadImages()
    }

    this.loadImages = function(){
        var img1 = new Image();
        var img2 = new Image();
        var img3 = new Image();

        img1.onload = function(){
            self.img1Loaded = true;
            self.currentImage = img1;
            self.images.push(img1);
        }
        img2.onload = function(){
            self.img2Loaded = true;
            self.images.push(img2);
        }
        img3.onload = function(){
            self.img3Loaded = true;
            self.images.push(img3);
        }

        //load all images
        img1.src = 'images/bird1.png';
        img2.src = 'images/bird2.png';
        img3.src = 'images/bird3.png';
    }

    this.update  = function(){
        if(!self.img1Loaded || !self.img2Loaded || !self.img3Loaded){
            return;
        }
        
        self.currentFrame++;
        // console.log(self.currentFrame);
        if(self.currentFrame % 5 == 0){
            self.changeImage();
        }
        // console.log(this.y);
        if(this.y <= 397){
            if(this.direction == 'down'){ 
                this.speedY += this.acceleration;
            }
            else{
                this.speedY -= this.acceleration;
            }
            this.y += this.speedY;
        }


        if(this.y > 397){
            this.y = 397;
        }

        //check gameover
        if(this.y>= 390){
            this.game.gameOver = true;
        }

        //check collision
        this.checkHitPipe();
    }

    this.checkHitPipe = function(){
        if(
            (
                this.x + 34 > this.game.pipe.x &&
                this.x < this.game.pipe.x + 52
             ) &&
            (
                (this.y < this.game.pipe.y - 150) || 
                (this.y + 24 > this.game.pipe.y)
            )
        ){
            this.game.gameOver = true;

        }
    };
   
    this.flap = function(){
        if(this.game.gameOver){
            return;
        }
        this.speedY = -16;
    }

    this.changeImage = function(){
        if(this.game.gameOver){
            return;
        }
        if(this.currentImageIndex == 2){
            this.currentImageIndex = 0;
        }
        else{
            this.currentImageIndex++;
        }
        // console.log(this.currentImageIndex);
        this.currentImage= this.images[this.currentImageIndex];
    }

    this.draw = function(){
        if(self.img1Loaded && self.img2Loaded && self.img3Loaded){
            self.game.context.drawImage(self.currentImage, this.x, this.y);
        }
    }
}
