class Tank{
    constructor(x,y,size,direct) {
        this.x = x;
        this.y = y;
        this.img = '';
        this.size = size;
        this.bullets = [];
        this.directT = direct;
    }
    render(canvas){
        let ctx = canvas.getContext('2d');
        this.img = document.getElementById('image');
        ctx.drawImage(this.img,this.x,this.y,this.size,this.size);
    }

    fire(){
        let bullet = new Bullet(this.x+this.size/2,this.y+this.size/2,this.directT);

        this.bullets.push(bullet);

    }
    drawBullet(canvas){
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].moveB();
            // if(this.bullets[i].checkCollision(enermy)){
            //     // this.bullets.splice(i,1);
            //     randomPos();
            // }

            this.bullets[i].render(canvas);
            if(this.bullets[i].xB > canvas.width || this.bullets[i].xB < 0 || this.bullets[i].yB > canvas.height || this.bullets[i].yB <0 ){
                this.bullets.splice(i,1);
            }
        }

    }


}