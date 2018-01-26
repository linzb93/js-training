(function($) {
    var requestAnimationFrame = window.requestAnimationFrame
                             || window.mozRequestAnimationFrame 
                             || window.webkitRequestAnimationFrame 
                             || window.msRequestAnimationFrame;

    var easing = {
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

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[Object Array]';
    }

    var Tween = {};

    Tween.init = function(obj) {
        this.startObj = obj;
        this.endObj = {};
        this.startTime = +new Date();
        this.easing = 'swing';
        this.duration = 0;
        this.cbStore = {};
    }

    //同时执行所有的tween实例
    Tween.update = function() {};

    var proto = Tween.init.prototype;

    proto.to = function(obj, duration) {
        this.endObj = obj;
        this.duration = duration;
        return this;
    }

    proto.start = function() {
        var ctx = this;
        if (this.cbStore.start) {
            this.cbStore.start();
        }

        var step = {};

        function doAnimation() {
            var curTime = +new Date();
            var deltaTime = curTime - ctx.startTime;
            if (deltaTime <= ctx.duration)  {
                var obj = {};
                for (var i in ctx.endObj) {
                    obj[i] = ctx.startObj[i] + (ctx.endObj[i] - ctx.startObj[i]) * easing[ctx.easing](deltaTime / ctx.duration);
                }
                if (ctx.cbStore.update) {
                    ctx.cbStore.update(obj);
                }
                requestAnimationFrame(doAnimation);
            } else {
                ctx.cbStore.update(ctx.endObj);
                return;
            }
        }
        doAnimation();
        return this;
    };

    proto.setAnimationType = function(type) {
        this.easing = type;
        return this;
    };

    //上一个tween实例执行完后执行的下一个tween实例。
    proto.next = function(tweenInstance) {
        if (isArray(tweenInstance)) {
            //
        } else {
            //
        }
        return this;
    };

    proto.on = function(event, callback) {
        if (!callback || typeof callback !== 'function') {
            return;
        }
        
        // event = ['start', 'update', 'end']的其中一个.
        this.cbStore[event] = callback;
        return this;
    };

    //重复
    proto.repeat = function(times) {
        if (times < 1 || parseInt(times) !== times) {
            return;
        } else if (times === Infinity) {
            //
        } else {
            //
        }
        return this;
    }

    //来回
    proto.yoyo = function() {}

    window.Tween = Tween;
})(jQuery);