function ImageSequence(container, width, height, prefix, firstFrame, lastFrame, imageExtension) {
    this.container = container;
    this.prefix = prefix;
    this.width = width;
    this.height = height;
    this.firstFrame = firstFrame;
    this.lastFrame = lastFrame;
    this.framesPerSecond = 30;
    this.currentIndex = 0;
    this.extn = imageExtension;

    $(this.container).css("overflow", "hidden");
    this.container.innerHTML = "";

    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0px";
    this.canvas.style.left = "0px";
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    $(this.container).prepend(this.canvas);

    this.imageNameArray = new Array();
    var padBy = 1;
    if (lastFrame > 9) {
        padBy = 2;
    }
    if (lastFrame > 99) {
        padBy = 3;
    }
    if (lastFrame > 999) {
        padBy = 4;
    }
    if (lastFrame > 9999) {
        padBy = 5;
    }

    var index = 0;
    for (var i = firstFrame; i <= lastFrame; i++) {
        this.imageNameArray[index++] = prefix + pad(i, padBy) + "." + imageExtension;
    }
    this.targetIndex = index - 1;
    this.lastIndex = index - 1;



    ImageSequence.prototype.jumpToFrame = function (index) {
        if (isNaN(index)) {
            return;
        }
        this.currentIndex = index % this.imageNameArray.length;
        if ($(this.container).hasClass("hidden")) {
            this.loadedIndex = this.loadingIndex + 1;
            return;
        }
        var img = new Image();
        img.loadingIndex = this.loadingIndex++;
        var self = this;
        img.onload = function () {
            if ((img.loadingIndex < self.loadedIndex && self.targetIndex > self.currentIndex) ||
                (img.loadingIndex > self.loadedIndex && self.targetIndex < self.currentIndex)) {
                return;
            }
            self.loadedIndex = img.loadingIndex;
            var ctx = self.canvas.getContext('2d');
            ctx.clearRect(0, 0, parseInt(self.width), parseInt(self.height));
            ctx.drawImage(img, 0, 0, parseInt(self.width), parseInt(self.height));
        }
        img.src = this.imageNameArray[this.currentIndex];

    }
    ImageSequence.prototype.jumpToPercentage = function (percentage) {
        var index = percentage * this.imageNameArray.length;
        this.jumpToFrame(index);
    }
    ImageSequence.prototype.animateToFrameWithCompletion = function (targetFrame, completion) {
        this.targetIndex = targetFrame % this.imageNameArray.length;
        if (this.targetIndex == this.currentIndex) {
            if (completion) {
                completion();
            }
            return;
        }
        this.completionCallback = completion;
        this.resume();
    }
    ImageSequence.prototype.animateToStartWithCompletion = function (completion) {
        if (this.currentIndex == 0) {
            completion();
            return;
        }
        var targetFrame = 0;
        if (this.currentIndex > this.imageNameArray.length / 2) {
            targetFrame = lastFrame;
        }
        this.targetIndex = targetFrame % this.imageNameArray.length;
        if (this.targetIndex == this.currentIndex) {
            if (completion) {
                completion();
            }
            return;
        }
        this.completionCallback = completion;
        this.resume();
    }
    ImageSequence.prototype.updateFrame = function () {
        var currentTime = new Date();
        var dif = currentTime.getTime() - this.startTime.getTime();
        var elapsedFrames = Math.floor(dif / 1000 * this.framesPerSecond);
        if (this.startIndex > this.targetIndex) {
            elapsedFrames *= -1;
        }
        var newFrame = this.startIndex + elapsedFrames;
        this.jumpToFrame(newFrame);
        if (newFrame == this.targetIndex ||
            (this.startIndex > this.targetIndex && newFrame < this.targetIndex) ||
            (this.startIndex < this.targetIndex && newFrame > this.targetIndex)) {
            this.jumpToFrame(this.targetIndex);
            this.pause();
            if (this.completionCallback != null) {
                this.completionCallback();
            }
            if (this.looping) {
                this.jumpToFrame(0);
                this.resume();
            }
        }
    }
    ImageSequence.prototype.pause = function () {
        clearInterval(this.updateTimer);
    }
    ImageSequence.prototype.play = function () {
        this.resume();
    }
    ImageSequence.prototype.resume = function () {
        this.startIndex = this.currentIndex;
        this.startTime = new Date();
        clearInterval(this.updateTimer);
        var temp = this;
        this.updateTimer = setInterval(function () { temp.updateFrame(); }, 16);
    }
    ImageSequence.prototype.imageLoaded = function () {
        this.loadedCount++;
        if (this.loadedCount == this.imageNameArray.length) {
            this.isSequencePreloaded = true;
        }
    }
    ImageSequence.prototype.appendSequence = function (prefix, firstFrame, lastFrame, imageExtension) {
        var padBy = 1;
        if (lastFrame > 9) {
            padBy = 2;
        }
        if (lastFrame > 99) {
            padBy = 3;
        }
        if (lastFrame > 999) {
            padBy = 4;
        }
        if (lastFrame > 9999) {
            padBy = 5;
        }

        var index = this.imageNameArray.length;
        for (var i = firstFrame; i <= lastFrame; i++) {
            this.imageNameArray[index++] = prefix + pad(i, padBy) + "." + imageExtension;
        }
        this.targetIndex = index - 1;

    }

}

function pad(n, width, z) { z = z || '0'; n = n + ''; return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n; }



function inheritsFrom(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

inheritsFrom(DragableImageSequence, ImageSequence)
function DragableImageSequence(container, width, height, prefix, firstFrame, lastFrame, imageExtension, speed) {
    ImageSequence.call(this, container, width, height, prefix, firstFrame, lastFrame, imageExtension)

    this.imageSequence = this;
    this.isHorizontal = true;
    this.callbackDragStarted = null

    this.touchArea = document.createElement("div");
    this.touchArea.style.position = "absolute";
    this.touchArea.style.width = this.width + "px";
    this.touchArea.style.height = this.height + "px";

    var self = this;
    this.touchArea.addEventListener('touchstart', function (event) { self.touchBegan(event); }, false);
    this.touchArea.addEventListener('mousedown', function (event) { self.touchBegan(event); }, false);
    this.touchArea.addEventListener('onmousedown', function (event) { self.touchBegan(event); }, false);

    $(this.container).append(this.touchArea);

    DragableImageSequence.prototype.touchBegan = function (event) {
        
        event.stopPropagation();
        event.preventDefault();
    }
}