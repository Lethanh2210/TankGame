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
                collision.stop();
                collision.sound.currentTime = 0;
                collision.play();
                score.count +=1;
                enermys.splice(i, 1);
                tank1.bullets.splice(j, 1);
                i--;
                break;
            }
        }
    }
}
function checkCollisionEnermy_Tank(){
    for (let i = 0; i < enermys.length; i++) {
        for (let j = 0; j < enermys[i].enermyBullets.length; j++) {
            if(enermys[i].enermyBullets[j].checkCollision(tank1)){
                collision.stop();
                collision.sound.currentTime = 0;
                collision.play();
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
function checkCollisonBoss_Tank(){
    for (let i = 0; i < boss.bullets.length; i++) {
        if(boss.bullets[i].checkCollision(tank1)){
            collision.stop();
            collision.sound.currentTime = 0;
            collision.play();
            tank1.hp -= 20;
            boss.bullets.splice(i,1);
            i--;
        }
    }
}
function checkCollisionBoss(){
    for (let i = 0; i < tank1.bullets.length; i++) {
        if(tank1.bullets[i].checkCollision(boss,40)){
            collision.stop();
            collision.sound.currentTime = 0;
            collision.play();
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
function restart(){
    clearAll();
    gamePlay.play();
    gamePlay.sound.loop = true;
    gameOver = false;
    main();
    document.getElementById('restart-game').hidden = true;
    document.getElementById('game-over-btn').hidden = true;
    enermys.length = 0;
    score.count = 0;
    n=5;
    score.count = 0;
    tank1.hp = 100;
}
function startGame(){
    clearAll();
    score.count = 0;
    bgSound.stop();
    gamePlay.play();
    gamePlay.sound.loop = true;
    gameOver = false;
    main();
    document.getElementById('restart-game').hidden = true;
    document.getElementById('game-over-btn').hidden = true;
    document.getElementById('back-to-home').hidden =false;
    enermys.length = 0;
    score.count = 0;
    n=5;
    tank1.hp = 100;
}
function help(){
    clearAll();
    let img = document.getElementById('howToPlay');
    pen.drawImage(img,0,0,paper.width,paper.height);
    document.getElementById('introduce').hidden = true;
    document.getElementById('start-game').hidden = true;
    document.getElementById('back-btn').hidden = false;
}
function back_btn(){
    clearAll();
    pen.drawImage(imgBG,0,0,paper.width,paper.height);
    document.getElementById('start-game').hidden = false;
    document.getElementById('introduce').hidden = false;
    document.getElementById('back-btn').hidden = true;
}
window.addEventListener('keyup', moveU);
function moveU(evt) {
    switch (evt.key) {
        case KEY_J:
        case KEY_K:
            tank1.isFire = false;
            break;
        case KEY_A:
        case KEY_W:
        case KEY_D:
        case KEY_S:
            tank1.isMove = false;
            break;
    }
}
window.addEventListener('keydown', moveD);
window.addEventListener('keyup', moveU);

function moveD(evt) {
    switch (evt.key) {
        case KEY_A:
            tank1.img.src = 'img/left.png';
            tank1.directT = 'left';
            tank1.isMove = true;
            break;
        case KEY_S:
            tank1.img.src = 'img/down.png';
            tank1.directT = 'bottom';
            tank1.isMove = true;
            break;
        case KEY_D:
            tank1.img.src = 'img/right.png';
            tank1.directT = 'right';
            tank1.isMove = true;
            break;
        case KEY_W:
            tank1.img.src = 'img/up.png';
            tank1.directT = 'top';
            tank1.isMove = true;
            break;
        case KEY_J:
            tank1.isFire = true;
            tank1.typeGun = 1;
            break;
        case KEY_K:
            tank1.isFire = true;
            tank1.typeGun = 2;
            break;
    }
}
function GameOver(){
    if(gameOver === true){
        drawBG(paper);
        pen.font = "75px Comic Sans MS";
        pen.textAlign = "center";
        pen.fillStyle = 'white';
        pen.fillText('Lose', paper.width/2, paper.height/2);
        document.getElementById('restart-game').hidden = false;
        document.getElementById('game-over-btn').hidden = false;
        document.getElementById('introduce').hidden = true;
        gamePlay.stop();
    }
}
function game_over(){
    clearAll();
    tank1.x = paper.width / 2;
    tank1.y = paper.height /2;
    enermys = [];
    n = 5;
    bgSound.play();
    bgSound.sound.loop = true;
    document.getElementById('start-game').hidden = false;
    document.getElementById('game-over-btn').hidden = true;
    document.getElementById('restart-game').hidden = true;
    document.getElementById('introduce').hidden = false;
    pen.drawImage(imgBG,0,0,paper.width,paper.height);
}