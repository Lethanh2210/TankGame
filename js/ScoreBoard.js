class ScoreBoard{
    constructor(x,y,count) {
        this.x = x;
        this.y = y;
        this.count = count;
    }
    render(canvas){
        let ctx = canvas.getContext('2d');
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(`SCORE: ${this.count}`, this.x, this.y);
    }
}