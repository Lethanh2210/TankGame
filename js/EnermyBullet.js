class EnermyBullet{
    constructor(x,y,direct){
        this.x = x;
        this.y = y;
        this.height = 40;
        this.witdh = 40;
        this.direct = direct;
        this.speed = 5;
        this.img = document.getElementById('E-bullet');
    }
    render(paper){
        let pen = paper.getContext('2d');
        this.img = document.getElementById('image0')
        pen.drawImage(this.img,this.x,this.y,this.witdh,this.height);
    }
    checkCollision(obj) {
        let left2 = obj.x ;
        let right2 = obj.x + obj.size;
        let top2 = obj.y ;
        let bottom2 = obj.y + obj.size;
        let left1 = this.x ;
        let right1 = this.x + this.witdh;
        let top1 = this.y ;
        let bottom1 = this.y + this.height;
        if(left1 > right2 || right1 < left2 || top1 > bottom2 || bottom1 < top2){
            return false;
        }
        return true;
    }
    moveBE(){
        switch (this.direct){
            case 'top':
                this.y -= this.speed;
                this.img.src = 'img/e-Bullet/ballU.png';
                break;
            case 'bottom':
                this.y += this.speed;
                this.img.src = 'img/e-Bullet/ballD.png'
                break;
            case 'right':
                this.x += this.speed;
                this.img.src = 'img/e-Bullet/ballR.png'
                break;
            case 'left':
                this.x -= this.speed;
                this.img.src = 'img/e-Bullet/ballL.png'
                break;
            case'LT':
                this.x -= this.speed;
                this.y -= this.speed;
                break;
            case'RT':
                this.x += this.speed;
                this.y -= this.speed;
                break;
            case'RB':
                this.x += this.speed;
                this.y += this.speed;
                break;
            case'LB':
                this.x -= this.speed;
                this.y += this.speed;
                break;

        }
    }

}
