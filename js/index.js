function startAnimation() {
    setInterval(idiot, 20);
    setInterval(kestrel, 20);
}

const inputPos = 15;
let idiotPos = inputPos;

function idiot() {
    let input = document.querySelector('.input');
    let pipe = document.querySelector('.idiot .pipe');
    input.style.setProperty('--left-to-right', idiotPos);

    let idiot = document.querySelector('.idiot');

    idiotPos+=1;
    
    if (idiotPos<85) {
        input.innerHTML = '1';
        idiot.style.display = 'block';
    }
    if (idiotPos>=85) input.innerHTML = '';
    if (idiotPos>=100) pipe.style.visibility = 'hidden';
    if (idiotPos>=120) {
        idiotPos = inputPos;
        pipe.style.visibility = 'visible';
    }
}

let startDelayKestrelAnimation = 0;
let stopDelayKestrelAnimation = 0;
let kestrelALR = 0;
let kestrelATB = 30;
let kestrelBLR = 20;
let pauseKestrelALR = false;
let pauseKestrelBLR = true;
let pauseKestrelATB = true;
let kestrelAFinished = false;
let allFinished = false;

function resetKestrel() {
    startDelayKestrelAnimation = 0;
    stopDelayKestrelAnimation = 0;
    kestrelALR = 0;
    kestrelATB = 30;
    kestrelBLR = 20;
    stopKestrelAnimation = false;
    pauseKestrelALR = false;
    pauseKestrelBLR = true;
    pauseKestrelATB = true;
    kestrelAFinished = false;
    allFinished = false;
}

function hide(html) {
    html.style.visibility = 'hidden';
}

function unhide(html) {
    html.style.visibility = 'visible';
}

function kestrel() {
    let pipeA = document.querySelector('.kestrel-a .pipe');
    let kestrelA = document.querySelector('.kestrel-a');
    let kestrelB = document.querySelector('.kestrel-b');
    let inputA = document.querySelector('.kestrel-input-a');
    let inputB = document.querySelector('.kestrel-input-b');

    inputA.style.setProperty('--left-to-right', kestrelALR);
    inputA.style.setProperty('--top-to-bottom', kestrelATB);
    inputB.style.setProperty('--left-to-right', kestrelBLR);

    startDelayKestrelAnimation++;

    if (startDelayKestrelAnimation>=20&&pauseKestrelATB&&!pauseKestrelALR) kestrelALR++;
    if (!pauseKestrelATB) kestrelATB++;
    if (!pauseKestrelBLR) kestrelBLR++;
    if (kestrelALR>=48) pauseKestrelALR = true;

    if (pauseKestrelALR) pauseKestrelATB = false;
    if (kestrelATB>=54) {
        pauseKestrelATB = true;
        pauseKestrelALR = false;
    }

    if (kestrelALR>95) {
        pauseKestrelALR = true;
        kestrelAFinished = true;
    }

    if (kestrelAFinished) {
        hide(pipeA);
        pauseKestrelBLR = false;
    }

    if (kestrelBLR>=49) {
        // hide(inputB);
        pauseKestrelBLR = true;
        allFinished = true;
    }

    if (allFinished) {
        stopDelayKestrelAnimation++;
    }

    if (stopDelayKestrelAnimation>=20) {
        resetKestrel();
        unhide(pipeA);
        // unhide(inputB);
    }
}

startAnimation();