class Tank{
    constructor(x,y,size,direct) {
        this.x = x;
        this.y = y;
        this.img = '';
        this.size = size;
        this.bullets = [];
        this.directT = direct;
        this.isFire = false;
        this.isMove = false;
        this.reloadTime = 10;
        this.count = 0;
        this.hp = 100;
        this.speed = 5;
        this.typeGun = 1;
    }
    render(canvas){
        let ctx = canvas.getContext('2d');
        this.img = document.getElementById('image');
        ctx.drawImage(this.img,this.x,this.y,this.size,this.size);
        ctx.beginPath();
        ctx.rect(this.x,this.y - 10,this.size,5);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(this.x, this.y - 10, this.size*(this.hp/100),5);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

    }

    fire(){
        let gun1 = [this.x+this.size/2,this.y+this.size/2];
        let gun2 = [
            [this.x+this.size/2-15,this.y+this.size/2-15],
            [this.x+this.size/2+15,this.y+this.size/2+15]
        ]


        this.count++;
        if(this.count >= this.reloadTime){
            if (this.isFire){
                let bullet;
                switch (this.typeGun) {
                    case 1:
                        this.reloadTime = 10;
                        bullet = new Bullet(gun1[0],gun1[1],this.directT);
                        this.bullets.push(bullet);
                        break;
                    case 2:
                        this.reloadTime = 20;
                        bullet = new Bullet(gun2[0][0],gun2[0][1],this.directT);
                        this.bullets.push(bullet);
                        bullet = new Bullet(gun2[1][0],gun2[1][1],this.directT);
                        this.bullets.push(bullet);
                        break;
                }

            }
            this.count = 0;
        }
    }

    move(){
        if(!this.isMove) return;
        switch (this.directT) {
            case "left":
                this.x -= this.speed;
                break;
            case "right":
                this.x += this.speed;
                break;
            case "top":
                this.y -= this.speed;
                break;
            case "bottom":
                this.y += this.speed;
                break;
            default:

        }
    }
    drawBullet(canvas){
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].moveB();
            this.bullets[i].render(canvas);
            if(this.bullets[i].xB > canvas.width || this.bullets[i].xB < 0 || this.bullets[i].yB > canvas.height || this.bullets[i].yB <0 ){
                this.bullets.splice(i,1);
            }
        }
    }


}