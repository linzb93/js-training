(function($) {
    var defaults = {
        totalPage: 1,
        setPage: function() {}
    }
    function Pager($this, option) {
        this.$this = $this;
        this.o = $.extend({}, defaults, option);
        this.curPage = 1;

        this.createPage(1);
        this.initEvent();
    }
    Pager.prototype = {
        createPage: function(page) {
            var html = '';
            var showNum = Math.min(this.o.totalPage, 5);
            var startNum = 0;

            page = parseInt(page);
            this.$this.empty();
            if (page > 3 && this.o.totalPage > 5) {
                html += '<a class="pager-btn-first" href="javascript:;">首页</a><a class="pager-btn-prev" href="javascript:;">上一页</a>';
            }
            if (page <= 3 || this.o.totalPage <= 5) {
                startNum = 1;
            } else if (this.o.totalPage - page < 3) {
                startNum = this.o.totalPage - 4;
            } else {
                startNum = page - 2;
            }
            for (var i = startNum, j = 0; j < showNum; i++, j++) {
                html += '<a class="pager-num" href="javascript:;">' + i + '</a>';
            }
            if (this.o.totalPage - page >= 3 && this.o.totalPage > 5) {
                html += '<a class="pager-btn-next" href="javascript:;">下一页</a><a class="pager-btn-last" href="javascript:;">尾页</a>';
            }
            this.$this.append(html);
            this.$this.children('.pager-num').each(function() {
                if (parseInt($(this).text()) === page) {
                    $(this).addClass('on').siblings().removeClass('on');
                }
            });
            this.curPage = page;
            this.o.setPage(page);
        },
        initEvent: function() {
            var self = this;
            this.$this.on('click', 'a', function(){
                var curCls = $(this).attr('class');
                switch (curCls) {
                    case 'pager-num' :
                        self.createPage($(this).text());
                        break;
                    case 'pager-btn-first':
                        self.createPage(1);
                        break;
                    case 'pager-btn-prev':
                        self.createPage(self.curPage - 1);
                        break;
                    case 'pager-btn-next':
                        self.createPage(self.curPage + 1);
                        break;
                    case 'pager-btn-last':
                        self.createPage(self.o.totalPage);
                        break;
                }
            })
        }
    };
    $.fn.pager = function(option) {
        new Pager($(this), option);
    };
})(jQuery);