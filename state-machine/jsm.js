(function() {
    function StateMachine(con) {
        this.con = con;
        this.index = 0;
    }

    StateMachine.prototype = {
        next: function() {
            this.con[this.index].cb();
            if (this.index === this.con.length - 1) {
                this.index = 0;
            } else {
                this.index++;
            }
        }
    };

    window.StateMachine = StateMachine;
})();