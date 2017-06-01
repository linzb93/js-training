(function() {
    'use strict';

    var class2type = {};

    var toString = class2type.toString;

    function indexOf(arr, item) {
        if (arr.indexOf) {
            return arr.indexOf(item)
        } else {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === item) {
                    return i;
                }
            }
            return -1;
        }
    }

    function each(obj, reverse, callback) {
        var len;
        var i = 0;
        if (arguments.length === 2) {
            callback = reverse;
            reverse = null;
        }
        if (isArrayLike(obj)) {
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
        } else {
            for (i in obj) {
                if (callback.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        }
    }

    each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function(name) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });

    function type(obj) {
        if ( obj == null ) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call( obj ) ] || "object" :
            typeof obj;
    }

    /*
     * 类数组对象，包括数组和以下类型的对象
     * {0:1, 1:9, 2:5, length: 3, ...}
     */
    function isArrayLike(obj) {
        var length = "length" in obj && obj.length;
        return type(obj) === 'array' || ("length" in obj && (length - 1) in obj)
    }

    /*
     * @class Database。
     * Database所有属性和方法都可被外部访问，仅供内部使用的属性和方法在名称前面添加'_'号。
     * @param {Object} [store] 数据库
     */
    function Database(store, strict) {
        this._store = store || [];
        this.length = this._store.length;

        /*
         * 严格模式，不是Javascript的严格模式
         * 严格模式下，会检查数组里面所有属性能否一一对应
         */
        this.strict = strict;

        //字段
        this.field = [];

        this._init();
    }

    //工具方法
    Database.utils = function() {
        return {
            each: each,
            type: type
        };
    };

    Database.prototype = {
        constructor: Database,
        _init: function() {
            if (this.strict) {
                this._fieldDetect();
            }
        },
        _fieldDetect: function() {
            each(this._store[0], function(value, key) {
                this.field.push(key);
            });
            var obj = this.field;
            each(this._store, function(item, index) {
                each(item, function(value, key) {
                    if (indexOf(obj, key) < 0) {
                        throw new Error('property ' + key + ' is not field in this database!');
                    }
                })
            });
        },
        push: function(obj) {
            var self = this;
            if (type(obj) === 'array') {
                each(obj, function(item) {
                    self._store.push(item);
                });
            } else{
                this._store.push(obj);
            }
            this.length = this._store.length;
        },
        update: function(obj, callback) {
            each(this._store, function(item) {
                if (callback(item)) {
                    each(obj, function(value, key) {
                        item[key] = obj[key];
                    });
                }
            });
        },
        filter: function(key, callback) {
            var arr = [];
            if (arguments.length === 1) {
                callback = key;
                key = null;
            }

            each(this._store, function(item) {
                if(callback(item)) {
                    arr.push(item);
                }
            });
            return arguments.length === 1 ?
                new SearchResult(arr) :
                new SearchResult(arr).find(key);
        },
        remove: function(callback) {
            each(this._store, true, function(item, index) {
                if(callback(item)) {
                    this._store.splice(index, 1);
                }
            });
        }
    };

    function SearchResult(result) {
        this._result = result;
    }

    SearchResult.prototype = {
        constructor: SearchResult,
        find: function(key) {
            var arr = [];
            var keys = key.split(' ');
            var obj;
            each(this._result, function(resultItem) {
                if (keys.length === 1) {
                    obj = resultItem[key];
                } else {
                    each(keys, function(keyItem, keyIndex) {
                        obj[keyIndex] = resultItem[keyIndex];
                    });
                }
                arr.push(obj);
            });
            return arr;
        },
        sum: function(key) {
            //sum和average方法只支持传入一个key
            var sum = 0;
            each(this._result, function(item) {
                sum += item[key];
            });
            return sum;
        },
        average: function(key) {
            return this.sum(key) / this._result.length;
        },
        orderBy: function(key,isDesc, callback) {
            //目前只支持1个key
            var arr = [];
            var sortdResult = [];
            var self = this;
            if (arguments.length === 2) {
                callback = isDesc;
                isDesc = null;
            }
            callback = callback || null;

            each(this._result, function(item) {
                arr.push(item[key])
            });
            arr = !isDesc ? arr.sort(callback) : arr.reverse(callback);

            each(arr, function(arrItem, arrIndex) {
                each(self._result, true, function(resultItem, resultIndex) {
                    if (resultItem[key] === arrItem) {
                        sortdResult.push(resultItem);
                        self._result.splice(resultIndex, 1);
                    } else {
                        return true;
                    }
                });
            });

            return sortdResult;
        },
        min: function(key, callback) {
            return this.eq(key, 0, callback);
        },
        max: function(key, callback) {
            return this.eq(key, -1, callback);
        },
        eq: function(key, index, callback) {
            // index可取负数，表示从数组末尾往前选第-index个数。下面的take方法同理
            callback = callback || null;
            index = index >= 0 ? index : this._result.length + index;
            return this.orderBy(key, callback)[index];
        },

        /*
         * take和eq方法的区别:
         * eq是取数组的第index个数，take是取前/后index个数
         */
        take: function(key, index, callback) {
            callback = callback || null;
            return index >= 0 ?
                this.orderBy(key, callback).slice(0, index) :
                this.orderBy(key, callback).slice(index, -1);
        },
        some: function(callback) {
            each(this._result, function(item) {
                if (callback(item)) {
                    return true;
                }
            });
            return false;
        },
        every: function(callback) {
            each(this._result, function(item) {
                if (!callback(item)) {
                    return false;
                }
            });
            return true;
        },
        forEach: function(callback) {
            each(this._result, function(item, index) {
                callback.call(this, item, index);
            });
        }
    };

    Database.noConflict = function(name) {
        window[name] = Database;
    };

    window.Database = window.DB = Database;
})();