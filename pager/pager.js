;(function($) {
    var d = {
        cell: 'li',
        count: 10
    };
    function Pager($this, option){
        this.$this = $this;
        var o = $.extend({}, d, option);
        this.o = o;
        this.cell = this.$this.find(this.o.cell);
    }
    function countPageNum(ele, count) {
        return Math.floor(ele.length / count) + 1;
    }
    $.extend(Page.prototype, {
        init: function() {
            var num = countPageNum(this.cell, this.o.count);
            this.cell.hide();
            for (var i = 0; i < this.o.count; i++) {
                this.cell.eq(i).show();
            }
        },
        createPager: function() {},
        changePage: function() {
            this.$this.find('a').on('click', function() {});
        }
    })
    $.fn.pager = function(option) {
        new Pager($(this), option);
    };
})(jQuery);