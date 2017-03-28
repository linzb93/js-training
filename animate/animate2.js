function Animate(dom, properties, duration, easing, callback) {
    this.dom = dom;
    this.properties = properties;
    this.style = {};
    this.duration = duration;
    if (arguments.length === 4 && typeof easing === 'function') {
        this.callback = easing;
        this.easing = 'swing';
    } else {
        this.easing = easing || 'swing';
        this.callback = callback || null;
    }
    this.startTime = +new Date();
    for(var i in properties) {
        if (isNaN(Number(this.properties[i]))) {
            this.properties[i] = Number(this.properties[i].replace('px', ''));
        }

        this.style[i] = parseFloat(document.defaultView.getComputedStyle(this.dom)[i]);
    }

    this.start();
}

Animate.interval = 16;
Animate.easing = {
    swing: function(p) {
        return 0.5 - Math.cos( p * Math.PI ) / 2
    },
    linear: function(t) {
        return t;
    },
    easeOutBounce: function(x) {
        var n1 = 7.5625,
        d1 = 2.75;
        if ( x < 1/d1 ) {
            return n1*x*x;
        } else if ( x < 2/d1 ) {
            return n1*(x-=(1.5/d1))*x + .75;
        } else if ( x < 2.5/d1 ) {
            return n1*(x-=(2.25/d1))*x + .9375;
        } else {
            return n1*(x-=(2.625/d1))*x + .984375;
        }
    }
};

Animate.prototype = {
    start: function() {
        var self = this;
        this.timeId = setInterval(function() {
            self.step();
        }, Animate.interval);
    },
    step: function() {
        var curTime = +new Date();
        var deltaTime = curTime - this.startTime;
        if (deltaTime <= this.duration)  {
            var obj = {};
            for(var i in this.properties) {
                obj[i] = this.style[i] + (this.properties[i] - this.style[i]) * Animate.easing[this.easing](deltaTime / this.duration);
            }
            this.update(obj);
        } else {
            clearInterval(this.timeId);
            this.fix();
            this.callback && this.callback();
        }
    },
    update: function(obj) {
        for(var i in this.properties) {
            this.dom.style[i] = obj[i];
        }
    },
    fix: function() {
        for(var i in this.properties) {
            this.dom.style[i] = this.properties[i];
        }
    }
};