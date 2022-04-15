class Enermy {
    x;
    y;
    width;
    height;
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.speed = 1;
        this.direct = "right";
        this.img = ''
    }

    render(canvas){
        let ctx = canvas.getContext('2d');
        this.img = document.getElementById('image1');
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }

    checkScreen(canvas){
        if(this.x + this.width > canvas.width){
            this.direct = "left";
        }else if(this.x < 0){
            this.direct = "right";
        }

        if(this.y + this.height > canvas.height){
            this.direct = "top "
        }else if(this.y < 0 ){
            this.direct = "bottom"
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
                break;
            case "left":
                this.x -= this.speed;
                break;
            case "top":
                this.y -= this.speed
                break;
            case "bottom":
                this.y += this.speed;
                break;
        }


    }
}