class Bullet{
    constructor(x,y,direct) {
        this.xB = x;
        this.yB = y;
        this.speed = 10;
        this.directB = direct;
        this.rad = 5
    }
    render(canvas){
        let pen = canvas.getContext('2d');
        pen.beginPath();
        pen.fillStyle = 'white';
        pen.arc(this.xB,this.yB,this.rad,0,2*Math.PI);
        pen.closePath();
        pen.fill();
    }
    checkCollision(obj,a) {
        let left2 = obj.x + a;
        let right2 = obj.x + obj.width -a;
        let top2 = obj.y +a;
        let bottom2 = obj.y + obj.height - a;
        let left1 = this.xB - this.rad;
        let right1 = this.xB + this.rad;
        let top1 = this.yB - this.rad;
        let bottom1 = this.yB + this.rad;
        if(left1 > right2 || right1 < left2 || top1 > bottom2 || bottom1 < top2){
            return false;
        }
        return true;
    }
    moveB(){
        switch (this.directB){
            case 'top':
                this.yB -= this.speed;
                break;
            case 'bottom':
                this.yB += this.speed;
                break;
            case 'right':
                this.xB += this.speed;
                break;
            case 'left':
                this.xB -= this.speed;
                break;
        }

    }

}