'use strict'
let rotate = 0;
let canvas = document.getElementById('canvas');
let contex;
let bird;

if (canvas.getContext) {
    contex = canvas.getContext('2d');
    canvas.width  = window.innerWidth/1.5;
    canvas.height = window.innerHeight/1.2;

    drawBackground();
    drawTree(400, 450, 40, -Math.PI / 2, 12, 15);
    drawGrass();
    drawSun();
    startAnimateBird();
}

function drawBackground() {
    let lg = contex.createLinearGradient(0, 0, 0, contex.canvas.height);
    lg.addColorStop(0, "#00BFFF");
    lg.addColorStop(0.5, "white");
    contex.fillStyle = lg;
    contex.fillRect(0, 0, contex.canvas.width, contex.canvas.height/2);
}

function drawTree(startX, startY, length, angle, depth, branchWidth) {
    let rand = Math.random;
    let newLength, newAngle, newDepth, maxBranch = 3,
        endX, endY, maxAngle = 2 * Math.PI /6, subBranches;

    contex.beginPath();
    contex.moveTo(startX, startY);
    endX = startX + length * Math.cos(angle);
    endY = startY + length * Math.sin(angle);
    contex.lineCap = 'round';
    contex.lineWidth = branchWidth;
    contex.lineTo(endX, endY);

    if (depth <= 2) {
        contex.strokeStyle = '#4f270a';
    }
    else {
        contex.strokeStyle = '#2f1801';
    }
    contex.stroke();
    newDepth = depth - 1;

    if(!newDepth) {
        return;
    }
    subBranches = 2
    branchWidth *= 0.7;

    for (let i = 0; i < subBranches; i++) {
        newAngle = angle + rand() * maxAngle - maxAngle * 0.5;
        newLength = length * (0.7 + rand() * 0.3);
        drawTree(endX, endY, newLength, newAngle, newDepth, branchWidth);
    }

}

function drawGrass(){
    let img = document.createElement('img');
    img.src = "Grass.png";

    img.onload = function() {
        contex.drawImage(img, 0, 250, window.innerWidth, 450);
    }
}

function drawSun() {
    rotateSun();
    let lg = contex.createLinearGradient(0, 0, 0, contex.canvas.height);
    lg.addColorStop(0, "#00BFFF");
    lg.addColorStop(0.5, "white");
    contex.fillRect(0, 0, 200, 220);  // Create a filled rectangle.

    contex.save();
    contex.translate(canvas.width/8, canvas.height/4);

    contex.rotate(rotate);
    contex.beginPath();
    contex.arc(0,0, 35, 0, 2*Math.PI, false);
    contex.fillStyle = "#FFD700";
    contex.fill();

    let rotateSunRays = 0;
    const numberOfSunRays = 10;
    for (let i = 0; i < numberOfSunRays; i++) {
        contex.save();
        contex.fillStyle = "#FF8C00"
        contex.rotate(rotateSunRays);
        contex.translate(45, 0);
        if (i % 2 === 0)
            contex.fillRect(0,0,35,2);
        else
            contex.fillRect(0,0,15,2);
        contex.restore();
        rotateSunRays += (2*Math.PI) / numberOfSunRays;
    }
    contex.restore();

    setTimeout(drawSun, 20);
}

function rotateSun() {
    rotate += 0.01;
}

function startAnimateBird() {
    let coinImage = new Image();
    coinImage.src = 'bird.png';
    coinImage.width = 300;
    coinImage.height = 500;
    let lg = contex.createLinearGradient(0, 0, 0, contex.canvas.height);
    lg.addColorStop(0, "#00BFFF");
    lg.addColorStop(0.5, "white");
    contex.fillRect(650, 150, 300, 520);
    coinImage.onload = function() {
        bird = new Bird(contex, coinImage, 10, 4, 520, 500);
        bird.start();
    }
}






