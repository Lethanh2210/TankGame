let paper = document.getElementById('mycanvas');
paper.height = window.innerHeight;
paper.width = window.innerWidth;
let tank1 = new Tank(paper.width / 2, paper.height / 2, 50, 'top');
let boss = new Boss(200,200);
let pen = paper.getContext('2d');
const KEY_A = 'a';
const KEY_D = 'd';
const KEY_S = 's';
const KEY_W = 'w';
const KEY_J = 'j';
// tank1.render(paper);
let n = 5;
let enermys = [];
let score = new ScoreBoard(70,40,0);
let gameOver = false;
document.getElementById('restart-game').hidden = true;

function clearAll() {
    pen.clearRect(0, 0, paper.width, paper.height);
}
function randomPosE() {
    let x = Math.floor(Math.random() * paper.width)
    let y = Math.floor(Math.random() * paper.height)
    let enermy = new Enermy(x, y);
    enermys.push(enermy);
}

function creatEnermy() {
    for (let i = 0; i < n; i++) {
        randomPosE();
    }
}

function renderS(a) {
    a.autoMove();
    a.checkScreen(paper);
    a.render(paper);
}
function renderBoss(){
    boss.autoMove();
    boss.checkScreen(paper);
    boss.render(paper);
}
function renderAllE() {
    for (let i = 0; i < enermys.length; i++) {
        renderS(enermys[i]);
    }
}
function restart(){
    clearAll();
    gameOver = false;
    main();
    document.getElementById('restart-game').hidden = true;
    enermys.length = 0;
    score.count = 0;
    n=5;
}
function drawBG(canvas) {
    let pen = canvas.getContext('2d');
    let img = document.getElementById('bg');
    pen.drawImage(img, 0, 0, canvas.width, canvas.height);
}
function randomFire(){
    let random = Math.round(Math.random()*300+100);
    return random;
}
function checkAll() {
    for (let i = 0; i < enermys.length; i++) {
        for (let j = 0; j < tank1.bullets.length; j++) {
            if (tank1.bullets[j].checkCollision(enermys[i],20)) {
                score.count +=1;
                enermys.splice(i, 1);
                tank1.bullets.splice(j, 1);
                i--;
                break;
            }
        }
    }
}
function checkCollisionTank(){
    for (let i = 0; i < enermys.length; i++) {
        for (let j = 0; j < enermys[i].enermyBullets.length; j++) {
            if(enermys[i].enermyBullets[j].checkCollision(tank1)){
                tank1.hp -= 50;
                enermys[i].enermyBullets.splice(j,1);
                j--;
            }
        }
    }
    if(tank1.hp <= 0){
        gameOver = true;
        tank1.hp = 100;
    }
}
function checkCollisionBoss(){
    for (let i = 0; i < tank1.bullets.length; i++) {
        if(tank1.bullets[i].checkCollision(boss,40)){
            boss.hp -= 2;
            tank1.bullets.splice(i,1);
            i--;
            break;
        }
    }
    if(boss.hp <= 0){
        score.count += 20;
        boss.hp = 100;
        n = 5;
    }
}
function main() {
    clearAll();
    if (enermys.length === 0 && n <=7) {
        n++;
        creatEnermy(enermys);
    }
    document.getElementById('start-game').hidden = true;
    checkAll();
    checkCollisionTank();
    drawBG(paper);
    renderAllE();
    score.render(paper);
    if(n > 7 && boss.hp > 0){
        renderBoss();
        checkCollisionBoss();
    }
    for (let i = 0; i < enermys.length; i++) {
        enermys[i].fire();
        enermys[i].drawBulletE(paper);
    }
    tank1.drawBullet(paper);
    tank1.fire();
    tank1.render(paper);
    if(gameOver === false){
        requestAnimationFrame(main);
    }else {
        GameOver();
        document.getElementById('restart-game').hidden = false;
    }
}
window.addEventListener('keyup', moveU);
function moveU(evt) {
    switch (evt.key) {
        case KEY_J:
            tank1.isFire = false;
            break;
    }
}
window.addEventListener('keydown', moveD);
function moveD(evt) {
    switch (evt.key) {
        case KEY_A:
            tank1.x -= 10;
            tank1.img.src = 'img/left.png';
            tank1.directT = 'left';
            break;
        case KEY_S:
            tank1.y += 10;
            tank1.img.src = 'img/down.png';
            tank1.directT = 'bottom';
            break;
        case KEY_D:
            tank1.x += 10;
            tank1.img.src = 'img/right.png';
            tank1.directT = 'right';
            break;
        case KEY_W:
            tank1.y -= 10;
            tank1.img.src = 'img/up.png';
            tank1.directT = 'top';
            break;
        case KEY_J:
            tank1.isFire = true;
            break;
    }
}
function GameOver(){
    if(gameOver === true){
        drawBG(paper);
        pen.font = "50px Comic Sans MS";
        pen.textAlign = "center";
        pen.fillStyle = 'white';
        pen.fillText('Lose', paper.width/2, paper.height/2);
    }
}
let imgBG = document.getElementById('start-game-BG')
pen.drawImage(imgBG,0,0,paper.width,paper.height);
// function start_Game(){
//     let img = new Image();
//     img.src ='img/start'
// }


