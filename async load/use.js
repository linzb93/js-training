(function() {
    var loading = [];
    var loaded = [];
    var cbStore = [];

    var header = document.getElementsByTagName('head')[0];

    function each(obj, reverse, callback) {
        var len;
        var i = 0;
        if (arguments.length === 2) {
            callback = reverse;
            reverse = null;
        }
        len = obj.length;
        if (!reverse) {
            for (; i < len; i++) {
                if (callback.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        } else {
            for (i = len - 1; i >= 0; i--) {
                if (callback.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        }
    }

    var use = function(name, cb) {
        each(cbStore, function(item, index) {
            if (item.name === name) {
                item.cb.push(cb);
            }
        });
    };
    use.add = function(config) {
        var extname = config.path.split('.').pop();
        if (extname === 'js') {
           var script = document.createElement('script');
           script.src = config.path;
           header.appendChild(script);
        } else if (extname === 'css') {
            var style = document.createElement('link');
            style.setAttribute('rel', 'stylesheet');
            style.setAttribute('href', config.path);
            header.appendChild(style);
        }
    };

    setInterval(function() {
        if () {}
    }, 100);
    window.use = use;
})();