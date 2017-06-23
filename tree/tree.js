(function($) {
    var defaults = {
        items: [],
        template: '<ul><li><a href="{{url}}">{{title}}</a>{{childrens}}</li></ul>',
    };

    function unwrap(str) {
        return str.slice(2,-2);
    }

    function Tree($this, option) {
        this.opt = $.extend({}, defaults, option);

        this.$this = $this;
        this._treeHtml = '';
        this._path = [0];

        this._init();
    }

    Tree.prototype = {
        _init: function() {
            this._render(this.opt.items, 1);
        },
        _render: function(item, depth) {
            var i = 0;
            var len = item.length;
            while(i < len) {
                var segmentTemp = this.opt.template.split('{{childrens}}');
                var prevHtml = segmentTemp[0];
                var nextHtml = segmentTemp[1];
                this._treeHtml += prevHtml.replace(/{{[^}]*}}/g, function(match) {
                    if (unwrap(match) === 'depth') {
                        return depth;
                    }
                    return item[i][unwrap(match)];
                });
                if (item[i].hasOwnProperty('childrens')) {
                    this._render(item[i].childrens, depth + 1);
                }
                i++;
                this._treeHtml += nextHtml.replace(/{{[^}]*}}/g, function(match) {
                    if (unwrap(match) === 'depth') {
                        return depth;
                    }
                    return item[i][unwrap(match)];
                });
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