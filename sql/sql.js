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
        for(i = 0; i < length; i++) {
            if (db[i][key1] === query[key1]) {
                break;
            }
        }
        return i;
    }

    function Sql(db) {
        this.db = db;
        this.length = db.length;
    }

    Sql.prototype = {
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
        select: function(key, query) {
            var i = doQuery(query, this.db, this.length);
            return this.db[i][key];
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