(function($) {
    var requestAnimationFrame = window.requestAnimationFrame
                             || window.mozRequestAnimationFrame 
                             || window.webkitRequestAnimationFrame 
                             || window.msRequestAnimationFrame;

    var easing = {
        swing: function(p) {
            return 0.5 - Math.cos( p * Math.PI ) / 2
        },
        linear: function(p) {
            return p;
        }
    };

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function each(items, callback) {
        for (var i = 0, len = items.length; i < len; i++) {
            callback(items[i], i);
        }
    }

    function bind(callback, ctx) {
        return function() {
            return callback.apply(ctx, [].slice.call(arguments));
        };
    }

    var Tween = {};

    Tween.store = [];

    Tween.init = function(obj) {
        this.startObj = obj;
        this.endObj = {};
        this.startTime = null;
        this.easing = 'swing';
        this.duration = 0;
        this.cbStore = {};
        this.nextTween = [];

        Tween.store.push(this);
    }

    //同时执行所有的tween实例
    Tween.startAll = function() {
        each(Tween.store, function(item) {
            item.start();
        });
    };

    var proto = Tween.init.prototype;

    proto.to = function(obj, duration) {
        this.endObj = obj;
        this.duration = duration;
        return this;
    }

    proto.start = function() {
        this.startTime = +new Date();
        if (this.cbStore.start) {
            this.cbStore.start();
        }
        this._doAnimation();
        return this;
    };

    proto._doAnimation = function() {
        var curTime = +new Date();
        var deltaTime = curTime - this.startTime;
        var easingFunc = typeof this.easing === 'function'
            ? this.easing
            : easing[this.easing];
        if (!easingFunc) {
            throw new Error('Easing function is not defined');
        }
        if (deltaTime <= this.duration)  {
            var obj = {};
            for (var i in this.endObj) {
                obj[i] = this.startObj[i] + (this.endObj[i] - this.startObj[i]) * easingFunc(deltaTime / this.duration);
            }
            if (this.cbStore.update) {
                this.cbStore.update(obj);
            }
            requestAnimationFrame(bind(this._doAnimation, this));
        } else {
            this.cbStore.update(this.endObj);
            if (this.cbStore.end) {
                this.cbStore.end();
            }
            if (this.nextTween.length) {
                each(this.nextTween, function(item) {
                    item.start();
                });
            }
            return;
        }
    };

    //设置动画函数曲线
    proto.setEasing = function(type) {
        this.easing = type;
        return this;
    };

    //上一个tween实例执行完后执行的下一个tween实例。
    proto.next = function(tweenInstance) {
        if (isArray(tweenInstance)) {
            this.nextTween = this.nextTween.concat(tweenInstance);
        } else {
            this.nextTween.push(tweenInstance);
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