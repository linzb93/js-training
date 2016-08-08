;(function($) {
    var d = {
        cell: 'li',
        count: 10,
        page: '.page'
    };
    function Pager($this, option){
        this.$this = $this;
        var o = $.extend({}, d, option);
        this.o = o;
        this.perCell = this.$this.find(this.o.cell);
        this.page = $(this.o.page);
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
        createPager: function() {
            var pageHtml = '';
            pageHtml += '<a href="javascript:;">首页</a>';
            pageHtml += '<a href="javascript:;">上一页</a>';
            for(var i = 0; i < 5; i++) {
                pageHtml += '<a href="javascript:;">' + i + '</a>';
            }
            pageHtml += '<a href="javascript:;">下一页</a>';
            pageHtml += '<a href="javascript:;">尾页</a>';
            this.page.append(pageHtml);
        },
        getCurPage: function() {
            this.$this.find('a').on('click', function() {
                var $text = $(this).text(),
                curNum = 0;
                if (parseInt($text) > 0) {
                    curNum = parseInt($text);
                } else {
                    switch () {
                        case '首页':
                            curNum = 1;
                            break;
                    }   case '上一页':
                            break;
                        case '下一页':
                            break;
                        case '尾页':
                            curNum =
                            break;
                }
            });
        },
        changePage: function(num) {
            //执行切换页面
            //分页器变换
        }
    })
    $.fn.pager = function(option) {
        new Pager($(this), option);
    };
})(jQuery);