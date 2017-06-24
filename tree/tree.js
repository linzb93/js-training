(function($) {
    var defaults = {
        items: [],
        template: '<ul><li><a href="{{url}}">{{title}}</a>{{childrens}}</li></ul>',
    };

    function assert(condition, msg) {
        if (!condition) {
            throw new Error(msg);
        }
    }

    //去掉模板字符串里的属性外面的'{{ }}'
    function unwrap(str) {
        return str.slice(2,-2);
    }

    //avoid XSS
    function strFormat(str) {
        return str.replace(/&/g, '&amp;')//&
                  .replace(/</g, '&lt;')//左尖号
                  .replace(/>/g, '&gt;')//右尖号
                  .replace(/"/g, '&quot;')//双引号"
                  .replace(/'/g, '&#039;');//IE下不支持&apos;'
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
                function match(html) {
                    return html.replace(/{{[^{}]*}}/g, function(match) {
                        var mat = unwrap(match);
                        if (mat === 'depth') {
                            return depth;
                        }
                        assert(item[i].hasOwnProperty(mat), 'property ' + mat + ' is not exist!');
                        var ret = item[i][mat].toString();
                        return strFormat(ret);
                    })
                }
                this._treeHtml += match(prevHtml);
                if (item[i].hasOwnProperty('childrens')) {
                    this._render(item[i].childrens, depth + 1);
                }
                i++;
                this._treeHtml += match(nextHtml);
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