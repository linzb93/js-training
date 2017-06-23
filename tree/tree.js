(function($) {
    var defaults = {};

    function Tree($this, option) {
        this.opt = $.extend({}, defaults, option);

        this.$this = $this;
        this._treeHtml = '';
        this._path = [0];

        this._init();
    }

    Tree.prototype = {
        _init: function() {
            this._render(this.opt.items);
        },
        _render: function(item) {
            var i = 0;
            var len = item.length;
            while(i < len) {
                this._treeHtml += '<ul>\
                                    <li>\
                                        <a href="#">' + item[i].title + '</a>';
                if ('childrens' in item[i]) {
                    this._render(item[i].childrens);
                }
                i++;
                this._treeHtml += '</li></ul>';
            }
        },
        html: function() {
            this.$this.html(this._treeHtml);
        }
    }

    $.fn.tree = function(option) {
        return new Tree($(this), option).html();
    };
})(jQuery);