(function() {
    var jssql = {
        create: function(db) {
            return new Sql(db);
        }
    };

    function doQuery(query, db, length) {
        for(var k in query) {
            var key1 = k;
        }
        for(var i = 0; i < length; i++) {
            if (db[i][key1] === query[key1]) {
                break;
            }
        }
        return i;
    }

    /*
     * @class Sql
     */
    function Sql(db) {
        this.db = db;
        this.length = db.length;
    }

    Sql.prototype = {
        //TODO:处理新增键名的问题
        add: function(list) {
            this.db.push(list);
            this.length = this.db.length;
        },
        update: function(list, query) {
            var i = doQuery(query, this.db, this.length);
            for(var j in list) {
                this.db[i][j] = list[j];
            }
        },
        //TODO:处理一次传入多值的问题
        select: function(key, query, operate) {
            var i = doQuery(query, this.db, this.length);
            if (arguments.length === 2) {
                return this.db[i][key];
            } else if (arguments.length === 3) {
                switch (operate) {
                    case 'sum':
                    case 'average':
                    case 'min':
                    case 'max':
                    default:
                    break;
                }
            }

        },
        delete: function(query) {
            var i = doQuery(query, this.db, this.length);
            this.db.splice(i);
        },
        empty: function() {
            this.db = '';
        }
    };

    window.jssql = jssql;
})();