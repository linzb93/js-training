(function() {
    var useStore = [];

    var use = function(name, cb) {
        useStore[name].cb.push(cb);
    };

    use.add = function(name, path, rely) {
        if (useStore[name]) {
            throw useStore[name] + ' exist!';
        }
        useStore[name] = {};
        useStore[name].path = path;
        useStore[name].loaded = false;
        useStore[name].cb = [];
        useStore[name].decide = [];
        if (!rely) {
            loadScript(name, path);
        } else {
            if (useStore[rely].loaded) {
                loadScript(name, path);
            } else {
                useStore[rely].decide.push(name);
            }
        }
    };

    function loadScript(name, path) {
        var s = document.createElement('script');
        s.src = path;
        document.body.appendChild(s);
        s.onload = s.onreadystatechange = function() {
            useStore[name].loaded = true;
            var cbLen = useStore[name].cb.length;
            if (cbLen) {
                for (var i = 0; i < cbLen; i++) {
                    useStore[name].cb[i]();
                }
            }
            if (useStore[name].decide.length) {
                for (var i = 0, len = useStore[name].decide.length; i < len; i++) {
                    emitToLoadScript(useStore[name].decide[i]);
                }
            }
        };
    }

    function emitToLoadScript(name) {
        loadScript(name, useStore[name].path);
    }

    window.use = use;
})();