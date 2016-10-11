(function() {
    var jssql = {
        create: function(db) {
            return new Sql(db);
        }
    };

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
            for(var i in query) {
                var key1 = i;
            }
            for(i = 0; i < this.length; i++) {
                if (this.db[i][key1] === query[key1]) {
                    break;
                }
            }
            for(var j in list) {
                this.db[i][j] = list[j];
            }
        },
        select: function(key, query) {
            for(var i in query) {
                var key1 = i;
            }
            for(i = 0; i < this.length; i++) {
                if (this.db[i][key1] === query[key1]) {
                    break;
                }
            }
            return this.db[i][key];
        },
        delete: function() {},
        empty: function() {}
    };

    window.jssql = jssql;
})();