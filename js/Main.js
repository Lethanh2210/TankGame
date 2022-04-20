let paper = document.getElementById('mycanvas');
paper.height = window.innerHeight - 50;
paper.width = window.innerWidth - 50;
let tank1 = new Tank(paper.width / 2, paper.height / 2, 50, 'top');
let boss = new Boss(200,200);
let pen = paper.getContext('2d');
const KEY_A = 'a';
const KEY_D = 'd';
const KEY_S = 's';
const KEY_W = 'w';
const KEY_J = 'j';
const KEY_K = 'k';
let n = 5;
let enermys = [];
let score = new ScoreBoard(70,40,0);
let gameOver = false;
document.getElementById('restart-game').hidden = true;
document.getElementById('game-over-btn').hidden = true;
document.getElementById('back-btn').hidden = true;
let bgSound = new Sound('sound/BackGroundSound.mp3');
let collision = new Sound('sound/Collision.mp3');
let gamePlay = new Sound('sound/gamePlaySound.mp3')
let imgBG = document.getElementById('start-game-BG');
pen.drawImage(imgBG,0,0,paper.width,paper.height);

function clearAll() {
    pen.clearRect(0, 0, paper.width, paper.height);
}
function main() {
    clearAll();
    if (enermys.length === 0 && n <=7) {
        n++;
        creatEnermy(enermys);
    }
    document.getElementById('start-game').hidden = true;
    document.getElementById('introduce').hidden = true
    checkAll();
    checkCollisionEnermy_Tank();
    checkCollisonBoss_Tank();
    drawBG(paper);
    renderAllE();
    score.render(paper);
    for (let i = 0; i < enermys.length; i++) {
        enermys[i].fire();
        enermys[i].drawBulletE(paper);
    }
    if(n > 7 && boss.hp > 0){
        renderBoss();
        checkCollisionBoss();
        boss.autoFire();
        boss.drawBulletB(paper);
    }

    tank1.move();
    tank1.drawBullet(paper);
    tank1.fire();
    tank1.render(paper);
    if(gameOver === false){
        requestAnimationFrame(main);
    }else {
        GameOver();

    }
}






