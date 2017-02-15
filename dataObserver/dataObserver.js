(function() {
    var db = {};

    function extend(obj1, obj2) {
        for (i in obj2) {
            obj1[i] = obj2[i];
        }
        return obj1;
    }

    function initProperty(name) {
        db[name] = db[name] || {};
    }

    var DataObserver = {
        alias: function(name) {
            if (window[name]) {
                throw new Error(name + ' is exist');
            } else {
                window[name] = DataObserver;
            }
        },
        get: function(name) {
            initProperty(name);
            if (db[name].get) {
                db[name].get(name);
            }
            return db[name].value;
        },
        set: function(name, value) {
            initProperty(name);
            if (db[name].set) {
                db[name].set(name, value);
            }
            db[name].value = value;
        },
        sub: function(action, name, fn) {
            if (action === 'set') {
                initProperty(name);
                db[name].set = fn;
            } else if (action === 'get') {
                initProperty(name);
                db[name].get = fn;
            }
        },
        defineProperty: function(name, obj) {
            initProperty(name);
            db[name] = extend(db[name], obj);
        }
    };
    window.DataObserver = DataObserver;
})();