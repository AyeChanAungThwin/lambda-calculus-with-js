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

    let creatingKite = new Bird('kestrel1-a');
    setInterval(function() {
        creatingKite.getBird()
    }, 20);

    let kite = new Bird('kite-a', true);
    setInterval(function () {
        kite.getBird()
    }, 20);
}

function Bird(birdName, animateSecondOne) {
    this.hideLeftPipe = 0;
    this.hideMidPipe = 0;
    this.hideRightPipe = 0;

    // this.isOneLayerBird = false;
    this.isTwoLayerBird = false;
    // this.isKite = false;

    this.areInitialized = false;
    this.startDelayAnimation = 0;
    this.stopDelayAnimation = 0;
    this.initL2R = 0;
    this.initT2B = 0;
    this.L2R = 0;
    this.T2B = 0;
    this.pauseL2R = false;
    this.pauseT2B = true;

    this.cssEndPoint = 0;
    this.hideUntil = 0;

    this.resetBird = function () {
        this.startDelayAnimation = 0;
        this.stopDelayAnimation = 0;
        this.L2R = this.initL2R;
        this.T2B = this.initT2B;
        this.pauseL2R = false;
        this.pauseT2B = true;

        this.hideLeftPipe = 0;
        this.hideMidPipe = 0;
        this.hideRightPipe = 0;

        this.isTwoLayerBird = false;
        // this.isKite = false;
    };

    this.getBird = function () {

        // if (birdName.toUpperCase().includes('IDIOT')) isOneLayerBird = true;
        if (birdName.toUpperCase().includes('KESTREL1')) {
            this.isCreatingKite = true;
            this.isTwoLayerBird = true;
        }

        if (birdName.toUpperCase().includes('KITE')) {
            this.isTwoLayerBird = true;
            // this.isKite = true;
        }

        let nameOfBird = birdName;
        if (this.isTwoLayerBird) {
            nameOfBird = birdName.slice(0, -1);
        }

        let birdName1 = nameOfBird + 'a';
        let birdName2 = nameOfBird + 'b';
        if (!this.isTwoLayerBird) birdName1 = birdName;

        //get html tags
        let bird1 = getHtmlTag(`.${birdName1}`);
        let ear = getPropertyValue(bird1, "--bird-ear");
        let throat = getPropertyValue(bird1, "--bird-throat");
        let pipe1 = getHtmlTag(`.${birdName1} .pipe`);
        let rightPipe1 = getHtmlTag(`.${birdName1} .pipe .right-pipe`);
        let input = getHtmlTag(`.${birdName1}-input`);

        if (animateSecondOne) {
            bird1 = getHtmlTag(`.${birdName2}`);
            ear = getPropertyValue(bird1, "--bird-ear");
            throat = getPropertyValue(bird1, "--bird-throat");
            pipe1 = getHtmlTag(`.${birdName2} .pipe`);
            rightPipe1 = getHtmlTag(`.${birdName2} .pipe .right-pipe`);
            input = getHtmlTag(`.${birdName2}-input`);
        }

        //two layer start
        let bird2 = null;
        let pipe2 = null;
        let leftPipe2 = null;
        let rightPipe2 = null;
        let idiot1 = null;
        let kestrel1 = null;
        let kite = null;

        if (this.isTwoLayerBird) {
            bird2 = getHtmlTag(`.${birdName2}`);

            pipe2 = getHtmlTag(`.${birdName2} .pipe`);
            leftPipe2 = getHtmlTag(`.${birdName2} .pipe .left-pipe`);
            rightPipe2 = getHtmlTag(`.${birdName2} .pipe .left-pipe`);
        }

        if (this.isCreatingKite) {
            kite = getHtmlTag(`.kite-demo`);
            idiot1 = getHtmlTag(`.bird-name.idiot1`);
            kestrel1 = getHtmlTag(`.bird-name.kestrel1-a`);

            idiot1.innerHTML = 'I';
            kestrel1.innerHTML = 'K';
            // kite.innerHTML = 'K(b)';
        }
        //two layer end

        //use as const
        if (!this.areInitialized) {
            this.initL2R = +(getPropertyValue(input, '--from-left'));
            this.initT2B = +(getPropertyValue(input, '--from-top'));
            this.L2R = this.initL2R;
            this.T2B = this.initT2B;
            this.areInitialized = true;

            this.cssEndPoint = +(getPropertyValue(input, '--end-point'));
            this.hideUntil = +(getPropertyValue(input, '--hide-until'));
            // this.hideLeftPipe = +(getPropertyValue(pipe, '--hide-left-pipe'));
            // this.hideMidPipe = +(getPropertyValue(pipe, '--hide-mid-pipe'));
            // this.hideRightPipe = +(getPropertyValue(pipe, '--hide-right-pipe'));
        }

        //lengths
        let leftPipeLength = +(getPropertyValue(pipe1, "--left-pipe-length"));
        let midPoint = leftPipeLength;
        let fromLeft = 0;
        fromLeft = this.initL2R;
        if (this.initL2R < 0) fromLeft = this.initL2R * -1;
        let endPoint = 100 + fromLeft;
        if (!!this.cssEndPoint) {
            endPoint = this.cssEndPoint;
        }
        let differenceBetweenThroat2Ear = throat - ear;

        // set values
        setPropertyValue(input, '--from-left', this.L2R);
        setPropertyValue(input, '--from-top', this.T2B);
        setPropertyValue(pipe1, '--hide-left-pipe', this.hideLeftPipe);
        setPropertyValue(pipe1, '--hide-mid-pipe', this.hideMidPipe);
        setPropertyValue(pipe1, '--hide-right-pipe', this.hideRightPipe);


        //start animation
        this.startDelayAnimation++;
        if (this.startDelayAnimation >= 20 && !this.pauseL2R) this.L2R += 2;
        if (!this.pauseT2B) this.T2B += 2;

        //hide left pipe
        if (this.L2R >= this.initL2R && this.L2R <= midPoint + 1) {
            this.hideLeftPipe = this.L2R * (100 / leftPipeLength);
        }

        //hide mid pipe
        if (this.T2B >= this.initT2B && this.T2B <= differenceBetweenThroat2Ear) {
            let startPoint = this.T2B - (this.initT2B);
            this.hideMidPipe = startPoint * (100 / differenceBetweenThroat2Ear);
        }

        //hide right pipe
        let hideEnd = 102;
        if (!!this.hideUntil) {
            hideEnd = this.hideUntil;
        }
        if (this.L2R >= midPoint && this.L2R <= hideEnd) {
            this.hideRightPipe = (this.L2R - midPoint - 1) * 2;
        }

        if (this.L2R >= midPoint) {
            this.pauseL2R = !!differenceBetweenThroat2Ear;
            this.pauseT2B = !this.pauseL2R;
        }

        let topToBottomLength = differenceBetweenThroat2Ear + this.initT2B;
        if (this.T2B >= topToBottomLength) {
            this.pauseT2B = true;
            this.pauseL2R = !this.pauseT2B;
        }

        //two layer end
        if (this.isCreatingKite && this.L2R >= 0) {
            hide(rightPipe1);
            unhide(pipe2);
            hide(leftPipe2);

            kestrel1.innerHTML = '';

            setPropertyValue(bird1, '--is-hidden', 'hidden');
            bird1.style.border = 'transparent';
        }
        if (this.isCreatingKite && this.T2B >= topToBottomLength) {
            this.pauseL2R = true;
            this.stopDelayAnimation++;

            kite.innerHTML = 'KI';
            idiot1.innerHTML = '';
            hide(pipe1);
        }
        //two layer end

        if (this.L2R >= endPoint) {
            this.pauseL2R = true;
            this.stopDelayAnimation++;
        }
        if (this.stopDelayAnimation >= 30) {
            this.resetBird();
            unhide(rightPipe1);
            //two layer
            if (this.isCreatingKite) {
                unhide(pipe1);
                hide(pipe2);
                kite.innerHTML = '';
                setPropertyValue(bird1, '--is-hidden', 'visible');
                bird1.style.border = '2px dashed #000';
            }
        }
    };
}

startAnimation();