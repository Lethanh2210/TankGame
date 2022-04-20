class Boss{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.img = '';
        this.height = 300;
        this.width = 300;
        this.direct = 'left';
        this.speed = 1;
        this.loadImg = 20;
        this.count1 = 0;
        this.count2 = 1;
        this.count = 0
        this.reloadTime = 200;
        this.hp = 100;
        this.bullets = [];
        this.status = false;
    }
    render(canvas){
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.src = this.img;
        ctx.drawImage(img,this.x,this.y,this.width,this.height);
        ctx.beginPath();
        ctx.rect(this.x, this.y - 10, this.width*(this.hp/100),5);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
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
    autoFire() {
        let direct = ["top","left","right","bottom",'LT','RT','LB','RB']
        this.count++;
        if (this.count >= this.reloadTime) {
            for (let i = 0; i < 8; i++) {
                let bullet = new EnermyBullet(this.x + this.width/2, this.y + this.height/2);
                bullet.direct = direct[i];
                this.bullets.push(bullet);
            }
            this.count = 0;
        }
    }
    drawBulletB(canvas){

        for (let i = 0; i < this.bullets.length; i++){
            this.bullets[i].moveBE();
            this.bullets[i].render(canvas);
            if(this.bullets[i].x > canvas.width + this.width/2 || this.bullets[i].x < 0 || this.bullets[i].y > canvas.height + this.height || this.bullets[i].y  < 0  ){
                this.bullets.splice(i,1);
            }
        }
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
                this.img = `img/boss/bossR${this.count2}.png`;
                this.count1++;
                if(this.count1 >= this.loadImg) {
                    this.count2++;
                    this.count1 = 0;
                }
                break;
            case "left":
                this.x -= this.speed;
                if(this.count2 >= 5){
                    this.count2 = 1;
                }
                this.img = `img/boss/bossL${this.count2}.png`;
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
                this.img = `img/boss/bossU${this.count2}.png`;
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
                this.img = `img/boss/bossD${this.count2}.png`;
                this.count1++;
                if(this.count1 >= this.loadImg) {
                    this.count2++;
                    this.count1 = 0;
                }
                break;
        }
    }

}