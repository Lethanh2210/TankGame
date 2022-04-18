class Enermy {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.speed = 1;
        this.direct = "bottom";
        this.img = '';
        this.status = true;
        this.count1 = 0;
        this.reloadTime = randomFire();
        this.count2 = 1;
        this.count = 0;
        this.loadImg = 20;
        this.enermyBullets = [];
    }
    render(canvas){
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.src = this.img;
        ctx.drawImage(img,this.x,this.y,this.width,this.height);

    }
    checkScreen(canvas){
        if(this.x  > canvas.width){
            this.x = 0;
        }else if(this.x + this.width< 0){
            this.x = canvas.width;
        }
        if(this.y  > canvas.height){
            this.y = 0
        }else if(this.y + this.height < 0 ){
            this.y = canvas.height;
        }
    }
    checkCollision(obj) {
        let left2 = obj.x + 20 ;
        let right2 = obj.x + obj.width - 20 ;
        let top2 = obj.y +20 ;
        let bottom2 = obj.y + obj.height - 20 ;

        let left1 = this.x + 5;
        let right1 = this.x - 5;
        let top1 = this.y + 5;
        let bottom1 = this.y - 5;
        if(left1 > right2 || right1 < left2 || top1 > bottom2 || bottom1 < top2){
            return false;
        }
        return true;
    }
    autoMove(){
        let directs = new Array(500).fill(this.direct);
        directs.push("left","right","bottom","top");
        let rand = Math.floor(Math.random()*directs.length);
        this.direct = directs[rand];
        this.move();
    }
    move(){
        switch (this.direct) {
            case "right":
                this.x += this.speed;
                if(this.count2 >= 4){
                    this.count2 = 1;
                }
                this.img = `img/EnermyR${this.count2}.png`;
                this.count1++;
                if(this.count1 >= this.loadImg) {
                    this.count2++;
                    this.count1 = 0;
                }
                break;
            case "left":
                this.x -= this.speed;
                if(this.count2 >= 4){
                this.count2 = 1;
                }
                this.img = `img/EnermyL${this.count2}.png`;
                this.count1++;


                if(this.count1 >= this.loadImg) {
                    this.count2++;
                    this.count1 = 0;
                }

                break;
            case "top":
                this.y -= this.speed;
                if(this.count2 >= 4){
                    this.count2 = 1;
                }
                this.img = `img/EnermyU${this.count2}.png`;
                this.count1++;
                if(this.count1 >= this.loadImg) {
                    this.count2++;
                    this.count1 = 0;
                }

                break;
            case "bottom":
                this.y += this.speed;
                if(this.count2 >= 4){
                    this.count2 = 1;
                }
                this.img = `img/EnermyD${this.count2}.png`;
                this.count1++;
                if(this.count1 >= this.loadImg) {
                    this.count2++;
                    this.count1 = 0;
                }
                break;
        }
    }
    fire(){
        this.count++;
        if(this.count >= this.reloadTime){
                let bulletE = new EnermyBullet(this.x+this.width/2,this.y+this.height/2,this.direct);
                this.enermyBullets.push(bulletE);
                this.count = 0;
        }
    }
    drawBulletE(canvas){
        for (let i = 0; i < this.enermyBullets.length; i++){
            this.enermyBullets[i].move();
            this.enermyBullets[i].render(canvas);
            if(this.enermyBullets[i].x > canvas.width || this.enermyBullets[i].x < 0 || this.enermyBullets[i].y > canvas.height || this.enermyBullets[i].y < 0 ){
                this.enermyBullets.splice(i,1);
            }
        }
    }
}
