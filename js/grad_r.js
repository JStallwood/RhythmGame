let banners = [];
let colors;
let blob;
let can_answer = true;
let score = 0;
let lives = 5;
let audio_context;
let audio_osc;

const live_size = 20;
const banner_height = 50;
const offset = 10;
const min_extra = 10;
const max_extra = 250;
const difficulties = [200, 150, 100, 50, 20, 10];


function setup() {
    let canvas = createCanvas(1052, 650);
    canvas.parent("game_div");

    let number_of_banners = Math.floor(height / (banner_height + offset));

    colors = [
        "#66FF00",
        "#1974D2",
        "#08E8DE",
        "#FFF000",
        "#FFAA1D",
        "#FF007F",
        "#681488",
        "#7B29A7",
        "#ED1592",
        "#F7EC45",
        "#9AC345",
        "#0EA44F",
        "#0078FF",
        "#BD00FF",
        "#FF9A00",
        "#01FF1F",
        "#E3FF00"
    ];

    for(let i = 0; i < number_of_banners; i++) {
        let chosen_colors = getDifferentColors();
        banners.push(
            new Banner(
                0, 
                (i * banner_height) + (i * offset) + offset, 
                100, 
                banner_height, 
                chosen_colors[0], 
                chosen_colors[1],
                min_extra,
                max_extra
            )
        );
    }

    blob = new Blob(width/2, 50, 0, 0);
}

function draw() {
    background(52);
    drawBanners();
    drawBlob();
    drawScore();
    drawLives();
    
    if(lives < 1) {
        handleGameOver();
    } 
}

function drawBanners() {
    banners.forEach(b => {
        b.update();
        b.show();
    });
}

function drawBlob() {
    blob.update();
    blob.show();
}

function drawScore() {
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(40);
    text(
            score.toString(), 
            width - 70,
            60
        );
}

function drawLives() {
    for(let i = 0; i < lives; i++) {
        let x = width - (lives * (live_size + 5)) + (i * (live_size + 5));
        noStroke();
        fill(color("#66FF00"));
        circle(x, 80, 20);
    }
}

function handleGameOver() {
    background(52);
        fill(255);
        noStroke();
        textAlign(CENTER);
        textSize(100);
        text(
                score.toString(), 
                width/2,
                height/2
            );
        textSize(60);
        text(
                "GAME OVER", 
                width/2,
                height/2 + 100
            );
        noLoop();
}

function getDifferentColors() {
    let color_one = random(colors);
    let color_two = random(colors);
    if(color_one == color_two) {
        return getDifferentColors();
    }
    else {
        return [color(color_one), color(color_two)];
    }
}

function keyTyped() {
    if(can_answer) {
        if(key === blob.current_letter) {
            score++;
            checkForChangeRate();
            handleAudio();
        }
        else {
            lives -= 1;
        }
        can_answer = false;
    }   
}

function checkForChangeRate() {
    if(score != 0 && score % 10 == 0) {
        blob.change_rate();
    }
}

function handleAudio() {
    if(audio_context == null) {
        audio_context = new (window.AudioContext || window.webkitAudioContext)();
    }
    audio_osc = audio_context.createOscillator(); 
    audio_osc.type = 'sine'; 
    audio_osc.connect(audio_context.destination);
    
    switch(key) {
        case "q":
            audio_osc.frequency.value = 261.63;
            break;
        case "w":
            audio_osc.frequency.value = 293.66; 
            break;
        case "o":
            audio_osc.frequency.value = 349.23;
            break;
        case "p":
            audio_osc.frequency.value = 392;
            break;
    }
    audio_osc.start(); 
    audio_osc.stop(audio_context.currentTime + 0.5);
}