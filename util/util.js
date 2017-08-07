var util = {};

util.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
        var last = new Date() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = new Date();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};

util.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : new Date();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = new Date();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

util.fill = function(item, length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        arr[i] = item;
    }
    return item;
}

//for IE < 9
//Array
util.iterate = function(isEvery, arr, cb) {
    var boo = isEvery;
    $.each(arr, function(index, item) {
        if (isEvery && !cb(item, index)) {
            boo = true;
            return false;
        } else if (!isEvery && cb(item, index)) {
            boo = false;
            return false;
        }
        return boo;
    });
}

util.some = function(arr, cb) {
    return util.iterate(false, arr, cb);
}

util.every = function(arr, cb) {
    return util.iterate(true, arr, cb);
};

util.reduce = function(arr, cb, initial) {
    var ret = initial || '';
    $.each(arr, function(index, item) {
        ret = cb(item);
    });
    return ret;
};

util.indexOf = function(arr, staff) {
    var i = -1;
    $.each(arr, function(index, item) {
        if (item === staff) {
            i = index;
            return false;
        }
    });
    return i;
};

//Function
util.bind = function(cb, context) {
    var self = this;
    return function() {
        return self.apply(context, arguments);
    }
};