(function($, window) {
    var defaults = {};

    function Tree($this, option) {
        this.opt = $.extend({}, defaults, option);

        this.$this = $this;

        this._init();
    }

    Tree.prototype = {
        _init: function() {},
        _deepRender: function() {
            var treeHtml = '';
            if (!this.opt.content) {
                treeHtml += '';
                for () {}
                this.$this.html(treeHtml);
            }
        },
        delete: function(node) {},
        close: function(node) {},
        open: function(node) {},
        toggleCheck: function(node, isCheck) {}
    }

    $.fn.tree = function(option) {
        return new Tree($(this), tree);
    };
})(jQuery, window);