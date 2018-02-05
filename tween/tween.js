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
        this.nextTween = []; //当前tween执行完成后要执行的所有tween
        this.timeId = null; //requestAnimationFrame在低版本浏览器不支持，要换成setTimeout
        this.repeatTimes = 1; //动画重复的次数
        this.isYoyo = false; //是否是来回执行的动画
        this.sequence = true; //当前是否是顺序执行的动画

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
        if (this.timeId) {
            clearTimeout(this.timeId);
        }
        if (deltaTime <= this.duration)  {
            var obj = {};
            for (var i in this.endObj) {
                obj[i] = this.startObj[i] + (this.endObj[i] - this.startObj[i]) * easingFunc(deltaTime / this.duration);
            }
            if (this.cbStore.update) {
                this.cbStore.update(obj);
            }
            if (requestAnimationFrame) {
                requestAnimationFrame(bind(this._doAnimation, this));
            } else {
                this.timeId = setTimeout(bind(function() {
                    this._doAnimation();
                }, this), 16);
            }
            
        } else {
            this.cbStore.update(this.endObj); //修复动画执行完毕后离结果有偏差的问题
            if (this.cbStore.end) {
                this.cbStore.end();
            }
            if (this.isYoyo) {
                var temp = this.startObj;
                this.startObj = this.endObj;
                this.endObj = temp;
                this.sequence = !this.sequence;
                // console.log(this.startObj, this.endObj)
            }
            if (!this.isYoyo || this.sequence) {
                this.repeatTimes--;
            }
            if (this.repeatTimes) {
                this.start();
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

    //重复动画
    proto.repeat = function(times) {
        if ((times < 0 || parseInt(times) !== times) && times !== Infinity) {
            throw new Error('times need to be Integer');
        } else {
            this.repeatTimes = times;
        }
        return this;
    };

    //是否来回执行动画
    proto.yoyo = function(isYoyo) {
        this.isYoyo = isYoyo;
        return this;
    }

    window.Tween = Tween;
})(jQuery);