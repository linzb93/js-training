(function(window) {
    function lo(arg) {
        return new Lo(arg);
    }
    function Lo(arg) {
        this.arg = arg;
    }
    Lo.prototype = {
        constructor: Lo,
        foreach: function(fn) {
            for (var i = 0; i < this.arg.length; i++) {
                fn(this.arg[i], i);
            }
        },
        map: function(fn) {
            var ret = [];
            this.foreach(function(item, index) {
                ret.push(fn(item, index));
            });
            this.arg = ret;
            return this;
        },
        filter: function(fn) {
            var ret = [];
            this.foreach(function(item, index) {
                if (fn(item, index)) {
                    ret.push(item);
                }
            });
            this.arg = ret;
            return this;
        },
        value: function() {
            return this.arg;
        }
    };

    window.lo = lo;
})(window);