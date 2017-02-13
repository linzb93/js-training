(function() {
    var sql = {
        create: function(db) {
            return new Sql(db);
        }
    };

    /*
     * @class Sql
     */
    function Sql(db) {
        this.db = db;
        this.length = db.length;
    }

    function SqlResult(result) {
        this.result = result;
    }

    Sql.prototype = {
        insert: function() {
            for (var i = 0, len = arguments.length; i < len; i++) {
                this.db.push(arguments[i]);
            }
            this.length = this.db.length;
        },
        update: function(key, value, fn) {
            for (var i  = 0, len = this.db.length; i < len; i++) {
                if (fn(this.db[i])) {
                    this.db[i][key] = value;
                }
            }
        },
        select: function(fn) {
            var arr = [];
            for (var i  = 0, len = this.db.length; i < len; i++) {
                if(fn(this.db[i])) {
                    arr.push(this.db[i]);
                }
            }
            return new SqlResult(arr);
        },
        delete: function(fn) {
            for (var i  = 0, len = this.db.length; i < len; i++) {
                if(fn(this.db[i])) {
                    this.db.splice(i, 1);
                }
            }
        }
    };

    SqlResult.prototype = {
        find: function(key) {
            var arr = [];
            for (var i  = 0, len = this.result.length; i < len; i++) {
                arr.push(this.result[i][key]);
            }
            return arr;
        },
        sum: function(key) {
            var sum = 0;
            for (var i  = 0, len = this.result.length; i < len; i++) {
                sum += this.result[i][key];
            }
            return sum;
        },
        average: function(key) {
            var sum = 0;
            for (var i  = 0, len = this.result.length; i < len; i++) {
                sum += this.result[i][key];
            }
            return sum / len;
        },
        orderBy: function(key, isDesc, fn) {},
        min: function(key, index) {},
        max: function(key, index) {},
        eq: function(key, index) {},
        any: function(fn) {},
        all: function(fn) {}
    };

    window.sql = sql;
})();