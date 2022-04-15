class Bullet{
    constructor(x,y,direct) {
        this.xB = x;
        this.yB = y;
        this.speed = 5;
        this.directB = direct;
        this.rad = 5
    }
    render(canvas){
        let pen = canvas.getContext('2d');
        pen.beginPath();
        pen.fillStyle = 'blue';
        pen.arc(this.xB,this.yB,this.rad,0,2*Math.PI);
        pen.closePath();
        pen.fill();
    }
    checkCollision(obj) {

        let left2 = obj.x+20;
        let right2 = obj.x + obj.size -20;
        let top2 = obj.y+20;
        let bottom2 = obj.y + obj.size-20;

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
            case 'up':
                this.yB -= this.speed;
                break;
            case 'down':
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