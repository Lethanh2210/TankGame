let paper = document.getElementById('mycanvas');
let tank1 = new Tank(paper.width / 2, paper.height / 2, 50, 'up');
let pen = paper.getContext('2d');
const KEY_A = 'a';
const KEY_D = 'd';
const KEY_S = 's';
const KEY_W = 'w';
const KEY_J = 'j';
let count1 = 0;
const loadImg = 150;
let count2 = 1;
tank1.render(paper);
let n = 5;
let enermys = [];
let score = new ScoreBoard(70,40,0);
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

function renderAllE() {
    for (let i = 0; i < enermys.length; i++) {
        renderS(enermys[i]);
    }
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
            if (tank1.bullets[j].checkCollision(enermys[i])) {
                score.count +=1;
                enermys.splice(i, 1);
                tank1.bullets.splice(j, 1);
                i--;
                j--;
                break;
            }
        }
    }
}
function checkCollisionTank(){
    for (let i = 0; i < enermys.length; i++) {
        for (let j = 0; j < enermys[i].enermyBullets.length; j++) {
            if(enermys[i].enermyBullets[j].checkCollision(tank1)){
                tank1.hp -= 10;
                // enermys[i].bullets.splice(j,1);
                break;
            }
        }
    }
    if(tank1.hp <= 0){
        alert('Lose');
    }
}
function main() {
    clearAll();
    if (enermys.length === 0) {
        n++;
        creatEnermy(enermys);
    }
    checkAll();
    checkCollisionTank();
    drawBG(paper);
    // turnE(enermys);
    renderAllE();
    score.render(paper);
    for (let i = 0; i < enermys.length; i++) {
        enermys[i].fire();
        enermys[i].drawBulletE(paper);
    }
    tank1.drawBullet(paper);
    tank1.fire();
    tank1.render(paper);
    requestAnimationFrame(main);
}
main();
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

