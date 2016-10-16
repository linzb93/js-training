(function($) {

    function Temp($this, json) {
        this.$this = $this;
        this.tempHtml = this.$this.html();
        this.len = json.length;

        this.getIndex()
    }

    Temp.prototype = {
        getIndex: function() {
            var indexArr = this.tempHtml.match(/{{\S*}}/g);
            var indexArr1 = [];
            for (var i = 0, len = indexArr.length; i < len; i++) {
                var temp = indexArr[i].replace(/{{/, '');
                temp = temp.replace(/}}/, '');
                indexArr1.push(temp);
            }
            return indexArr1;
        },
        render: function() {
            var keyArr = this.getIndex();
        }
    }

    $.fn.template = function(json) {
        new Temp($(this), json);
    };

})(jQuery);