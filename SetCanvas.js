
let paper = document.getElementById('mycanvas');
let tank1 = new Tank(paper.width/2,paper.height/2,50,'up');
let enermy = new Enermy(100,100);
let pen = paper.getContext('2d');
tank1.render(paper);
function clearAll(){
    pen.clearRect(0,0,paper.width,paper.height);
}
let enermys = [];
function randomPosE(enermys){
    let x = Math.floor(Math.random()*paper.width)
    let y = Math.floor(Math.random()*paper.height)
    let enermyT = new Enermy(x,y);
    enermys.push(enermyT);

}
function creatEnermy(){
    for (let i = 0; i < 7; i++) {
        randomPosE(enermys);
    }
}


function renderAllE(){
    for (let i = 0; i < enermys.length; i++) {
        enermys[i].autoMove();
        turnE(enermys[i]);
        enermys[i].checkScreen(paper);
        enermys[i].render(paper);
    }
}
function drawBG(canvas){
    let pen = canvas.getContext('2d');
    let img = document.getElementById('bg');
    pen.drawImage(img,0,0,canvas.width,canvas.height);
}
function randomPos() {
    let x = Math.floor(Math.random()*paper.width)
    let y = Math.floor(Math.random()*paper.height)
    enermy.x = x;
    enermy.y = y;
}
function checkAll(){
    for (let i = 0; i < tank1.bullets.length; i++) {
        for (let j = 0; j < enermys.length; j++) {
            if(tank1.bullets[i].checkCollision(enermys[j])){
                enermys.splice(j,1);
                tank1.bullets.splice(i,1);
                i--;
                j--;
                break;
            }
        }

    }
}
function check(){
    for (let i = 0; i < tank1.bullets.length; i++) {
        if(tank1.bullets[i].checkCollision(enermys[i])){
            randomPos();
            // tank1.bullets.splice(i,1);
        }
    }
}
function main(){
    clearAll();
    if(enermys.length === 0 ){
        creatEnermy(enermys);
    }

    // tao trc vai con rong -> push mang
    // for long quai vat voi dan -> check
    // enermy.autoMove();
    // turnE(enermy);
    // enermy.checkScreen(paper);
    // check();

    drawBG(paper);

    tank1.drawBullet(paper);
    // enermy.render(paper);
    renderAllE();
    checkAll();
    tank1.render(paper);


    requestAnimationFrame(main);
}
main();

window.addEventListener('keydown', moveT);
function moveT(evt){
switch (evt.key){
    case 'a':
        tank1.x -= 10;
        tank1.img.src = 'img/left.png';
        tank1.directT = 'left';
        // tank.render(paper);
        break;
    case 's':
        tank1.y += 10;
        tank1.img.src = 'img/down.png';
        tank1.directT = 'down';
        // tank.render(paper);
        break;
    case 'd':
        tank1.x += 10;
        tank1.img.src = 'img/right.png';
        tank1.directT = 'right';
        // tank.render(paper);
        break;
    case 'w':
        tank1.y -= 10;
        tank1.img.src = 'img/up.png';
        tank1.directT = 'up';
        // tank.render(paper);
        break;
    case 'j':
        tank1.fire();
        break;

}
}
 function turnE(enermy){
    switch (enermy.direct){
        case 'top':
            enermy.img.src = 'img/upE.png';
            break;
        case 'bottom':
            enermy.img.src = 'img/downE.png';
            break;
        case 'left':
            enermy.img.src = 'img/leftE.png';
            break;
        case 'right':
            enermy.img.src = 'img/rightE.png';
            break;
    }

 }