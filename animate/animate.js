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
        if (isNaN(Number(properties[i]))) {
            properties[i] = Number(properties[i].replace('px', ''));
        }
        this.style[i] = parseFloat(document.defaultView.getComputedStyle(this.dom)[i]);
    }

    this.start();
}

Animate.interval = 16;
Animate.easing = {
    swing: function( t,b,c,d ) {
        return b+(c-b)*(function(p) {
            return 0.5 - Math.cos( p * Math.PI ) / 2;
        })(t/d);
    },
    linear: function(t,b,c,d) {
        return b+(c-b)*t/d;
    },
    easeInQuad: function (t, b, c, d) {
        return b+(c-b)*Math.pow((t/d), 2);
    },
    easeInElastic: function (t, b, c, d) {
        return b+(c-b)*(function(x) {
            return x === 0 ? 0 : x === 1 ? 1 :
            -Math.pow( 2, 10 * x - 10 ) * Math.sin( ( x * 10 - 10.75 ) * ( 2 * Math.PI ) / 3 );
        })(t/d);
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
                obj[i] = Animate.easing[this.easing](deltaTime, this.style[i], this.properties[i], this.duration);
            }
            this.update(obj);
        } else {
            clearInterval(this.timeId);
            this.fix();
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
        this.callback && this.callback();
    }
};