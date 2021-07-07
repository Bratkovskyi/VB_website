var cvs = document.getElementById("canvasGame");
var ctx = cvs.getContext("2d");
var menu = document.getElementById("menuGame")
menu.hidden = true;

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

// При нажатии на каую либо кнопку

document.addEventListener('keydown', moveUp);
document.addEventListener("touchstart", moveUp);
function moveUp(){
    yPos -= 25;
    fly.play();
}
// Создание блоков
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}
var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.8;


window.onload = restart;
function restart() {
    var btnRestart = document.getElementById("btnGame");
    btnRestart.onclick = reload;
}
function reload() {
    location.reload();
}


function draw() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, 0 + pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
       
        pipe[i].x--;

        if (pipe[i].x == 100) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание Прикосновений
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height) {
            
            menu.hidden = false;
            restart;
            bwindow.stop();
            // location.reload(); //Перезапуск страницы
        }
        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }
   
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

     ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);


}

pipeBottom.onload = draw;
