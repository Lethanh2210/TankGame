class ScoreBoard{
    constructor(x,y,count,color,type) {
        this.x = x;
        this.y = y;
        this.count = count;
        this.color = color;
        this.type = type;
    }
    render(canvas){
        let ctx = canvas.getContext('2d');
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.fillText(`${this.type}: ${this.count}`, this.x, this.y);
    }
}