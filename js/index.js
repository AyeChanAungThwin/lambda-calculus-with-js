function hide(htmlTag) {
    htmlTag.style.visibility = 'hidden';
}

function unhide(htmlTag) {
    htmlTag.style.visibility = 'visible';
}

function getPropertyValue(htmlTag, value) {
    let cs = getComputedStyle(htmlTag);
    return cs.getPropertyValue(value);
}

function setPropertyValue(htmlTag, variable, value) {
    htmlTag.style.setProperty(variable, value);
}

function getHtmlTag(htmlTag) {
    return document.querySelector(htmlTag);
}

function startAnimation() {
    setInterval(function() {
        bird('idiot')
    }, 20);
}

let areInitialized = true;
let startDelayAnimation = 0;
let stopDelayAnimation = 0;
let initL2R = 0;
let initT2B = 0;
let L2R = initL2R;
let T2B = initT2B;
let pauseL2R = false;
let pauseT2B = true;

function resetBird() {
    startDelayAnimation = 0;
    stopDelayAnimation = 0;
    L2R = initL2R;
    T2B = initT2B;
    pauseL2R = false;
    pauseT2B = true;
}

function bird(inputName) {
    //get html tags
    let bird = getHtmlTag(`.${inputName}`);
    let ear = getPropertyValue(bird, "--bird-ear");
    let throat = getPropertyValue(bird, "--bird-throat");
    let pipe = getHtmlTag(`.${inputName} .pipe`);
    let input = getHtmlTag(`.${inputName}-input`);

    //use as const
    if (areInitialized) {
        initL2R = +(getPropertyValue(input, '--from-left'));
        initT2B = +(getPropertyValue(input, '--from-top'));
        L2R = initL2R;
        T2B = initT2B;
        areInitialized = false;
    }

    //lengths
    let leftPipeLength = +(getPropertyValue(pipe, "--left-pipe-length"));
    let midPoint = leftPipeLength;
    let fromLeft = 0;
    fromLeft = initL2R;
    if (initL2R<0) fromLeft = initL2R*-1;
    let endPoint = 100+fromLeft;
    let differenceBetweenThroat2Ear = throat-ear;

    //set values
    setPropertyValue(input, '--from-left', L2R);
    setPropertyValue(input, '--from-top', T2B);
    
    //start animation
    startDelayAnimation++;
    if (startDelayAnimation>=20&&!pauseL2R) L2R+=2;
    if (!pauseT2B) T2B+=2;

    if (L2R>=midPoint) {
        pauseL2R = !!differenceBetweenThroat2Ear;
        pauseT2B = !pauseL2R;
    }

    let topToBottomLength = differenceBetweenThroat2Ear+initT2B;
    if (T2B>=topToBottomLength) {
        pauseT2B = true;
        pauseL2R = !pauseT2B;
    }

    if (L2R>=endPoint) {
        hide(pipe);
        pauseL2R = true;
        stopDelayAnimation++;
    }
    if (stopDelayAnimation>=20) {
        resetBird();
        unhide(pipe);
    }
}

startAnimation();