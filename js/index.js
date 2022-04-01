function startAnimation() {
    setInterval(idiot, 20);
    setInterval(kestrel, 20);
}

const inputPos = 15;
let idiotPos = inputPos;

function idiot() {
    let input = document.querySelector('.input');
    input.style.setProperty('--left-to-right', idiotPos);

    let idiot = document.querySelector('.idiot');

    idiotPos+=1;
    
    if (idiotPos<85) {
        input.innerHTML = '1';
        idiot.style.display = 'block';
    }
    if (idiotPos>=85) input.innerHTML = '';
    if (idiotPos>=100) idiot.style.display = 'none';
    if (idiotPos>=120) idiotPos = inputPos;
}

let kestrelOne = 0;
let kestrelTwo = 20;
let top2bot = -50;
let pauseLeft2Right = false;
let pauseTop2Bot = false;
let startB = false;

function kestrel() {
    let input1 = document.querySelector('.kestrel-input-1');
    input1.style.setProperty('--left-to-right', kestrelOne);
    input1.style.setProperty('--top-to-bottom', top2bot);

    let input2 = document.querySelector('.kestrel-input-2');
    input2.style.setProperty('--left-to-right', kestrelTwo);

    let layer1 = document.querySelector('.kestrel-layer-1');
    let layer2 = document.querySelector('.kestrel-layer-2');
    let arrow = document.querySelector('.arrow-kestrel-1');

    if (!pauseLeft2Right) kestrelOne++;
    if (pauseTop2Bot) top2bot+=10;

    if (kestrelOne<85) {
        input1.innerHTML = '1';
        input2.innerHTML = '2';
        layer1.style.display = 'block';
        layer2.style.display = 'block';
        arrow.style.display = 'block';
    }
    if (kestrelOne>=47) pauseLeft2Right = true;
    if (kestrelOne>=95) {
        input1.innerHTML = '';
        startB = true;
        layer1.style.display = 'none';
        arrow.style.display = 'none';
    }

    if (kestrelOne>=120) {
        startB = false;
        kestrelTwo = 20;
        input2.innerHTML = '';
    }

    if (kestrelOne>=130) {
        layer2.style.display = 'none';
    }
    
    if (kestrelOne>=150) {
        kestrelOne = 0;
        top2bot = -50;
        pauseLeft2Right = false;
    }

    if (kestrelOne>=47&&pauseLeft2Right) {
        pauseTop2Bot = true;
    }
    if (top2bot>150) {
        pauseTop2Bot = false;
        pauseLeft2Right = false;
    }

    if (startB) {
        kestrelTwo++;
    }
}

startAnimation();