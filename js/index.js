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
    let idiot = new Bird('idiot');
    setInterval(function() {
        idiot.getBird()
    }, 20);
    
    let kestrel = new Bird('kestrel-a');
    setInterval(function() {
        kestrel.getBird()
    }, 20);
}

function Bird(birdName) {
    this.areInitialized = true;
    this.startDelayAnimation = 0;
    this.stopDelayAnimation = 0;
    this.initL2R = 0;
    this.initT2B = 0;
    this.L2R = this.initL2R;
    this.T2B = this.initL2R;
    this.pauseL2R = false;
    this.pauseT2B = true;

    this.resetBird = function() {
        this.startDelayAnimation = 0;
        this.stopDelayAnimation = 0;
        this.L2R = this.initL2R;
        this.T2B = this.initT2B;
        this.pauseL2R = false;
        this.pauseT2B = true;
    };

    this.getBird = function() {
        //get html tags
        let bird = getHtmlTag(`.${birdName}`);
        let ear = getPropertyValue(bird, "--bird-ear");
        let throat = getPropertyValue(bird, "--bird-throat");
        let pipe = getHtmlTag(`.${birdName} .pipe`);
        let input = getHtmlTag(`.${birdName}-input`);

        //use as const
        if (this.areInitialized) {
            this.initL2R = +(getPropertyValue(input, '--from-left'));
            this.initT2B = +(getPropertyValue(input, '--from-top'));
            this.L2R = this.initL2R;
            this.T2B = this.initT2B;
            this.areInitialized = false;
        }

        //lengths
        let leftPipeLength = +(getPropertyValue(pipe, "--left-pipe-length"));
        let midPoint = leftPipeLength;
        let fromLeft = 0;
        fromLeft = this.initL2R;
        if (this.initL2R < 0) fromLeft = this.initL2R * -1;
        let endPoint = 100 + fromLeft;
        let differenceBetweenThroat2Ear = throat - ear;

        //set values
        setPropertyValue(input, '--from-left', this.L2R);
        setPropertyValue(input, '--from-top', this.T2B);

        //start animation
        this.startDelayAnimation++;
        if (this.startDelayAnimation >= 20 && !this.pauseL2R) this.L2R += 2;
        if (!this.pauseT2B) this.T2B += 2;

        if (this.L2R >= midPoint) {
            this.pauseL2R = !!differenceBetweenThroat2Ear;
            this.pauseT2B = !this.pauseL2R;
        }

        let topToBottomLength = differenceBetweenThroat2Ear + this.initT2B;
        if (this.T2B >= topToBottomLength) {
            this.pauseT2B = true;
            this.pauseL2R = !this.pauseT2B;
        }

        if (this.L2R >= endPoint) {
            hide(pipe);
            this.pauseL2R = true;
            this.stopDelayAnimation++;
        }
        if (this.stopDelayAnimation >= 20) {
            this.resetBird();
            unhide(pipe);
        }
    };
}

startAnimation();