;(function($) {
    var d = {
        cell: 'li',
        count: 10,
        pagination: '',
    };
    function Pager($this, option){
        this.$this = $this;
        var o = $.extend({}, d, option);
        this.o = o;
        this.perCell = this.$this.find(this.o.cell);
        this.pagination = $(this.o.pagination);
        this.totalNum = countTotalPage(this.perCell, this.o.count);
        this.curNum = 1;
        this.prevNum = 1;
        var $firstLink, $prevLink, $nextLink, $lastLink, $pagiNumLink;
        this.init();
        this.getCurPage();
    }
    function countTotalPage(ele, count) {
        return Math.floor(ele.length / count) + 1;
    }
    function canHidePrev(cur) {
        return cur < 3;
    }
    function canHideNext(cur, total) {
        return total - cur < 3;
    }
    $.extend(Pager.prototype, {
        init: function() {
            this.perCell.hide();
            for (var i = 0; i < this.o.count; i++) {
                this.perCell.eq(i).show();
            }
            this.createPager();
        },
        createPager: function() {
            var pageHtml = '';
            pageHtml += '<a class="pager-pagi-first" href="#">首页</a>';
            pageHtml += '<a class="pager-pagi-prev" href="#">上一页</a>';
            for (var i = 1; i <= 5; i++) {
                pageHtml += '<a class="pager-pagi-num" href="#">' + i + '</a>';
            }
            pageHtml += '<a class="pager-pagi-next" href="#">下一页</a>';
            pageHtml += '<a class="pager-pagi-last" href="#">尾页</a>';
            this.pagination.append(pageHtml);
            $firstLink = $('.pager-pagi-first');
            $prevLink = $('.pager-pagi-prev');
            $nextLink = $('.pager-pagi-next');
            $lastLink = $('.pager-pagi-last');
            $pagiNumLink = $('.pager-pagi-num');
            $pagiNumLink.first().addClass('on');
            $firstLink.hide();
            $prevLink.hide();
        },
        getCurPage: function() {
            var that = this;
            this.pagination.find('a').on('click', function() {
                var $text = $(this).text();
                if (parseInt($text) > 0) {
                    that.curNum = parseInt($text);
                } else {
                    switch ($text) {
                        case '首页':
                        that.curNum = 1;
                        break;
                        case '上一页':
                        that.curNum--;
                        break;
                        case '下一页':
                        that.curNum++;
                        break;
                        case '尾页':
                        that.curNum = that.totalNum - 1;
                        break;
                    }
                }
                that.changePage();
            });
        },
        changePage: function() {
            //执行切换页面
            var that = this;
            for (var i = (this.prevNum - 1) * this.o.count; i < this.prevNum * this.o.count; i++) {
                this.perCell.eq(i).hide();
            }
            for (var i = (this.curNum - 1) * this.o.count; i < this.curNum * this.o.count; i++) {
                this.perCell.eq(i).show();
            }
            this.prevNum = this.curNum;
            //分页器变换
            if (canHidePrev(this.curNum)) {
                $firstLink.hide();
                $prevLink.hide();
                $nextLink.show();
                $lastLink.show();
            } else if (canHideNext(this.curNum, this.totalNum)) {
                $firstLink.show();
                $prevLink.show();
                $nextLink.hide();
                $lastLink.hide();
            } else {
                this.pagination.find('a').show();
            }
            var addNum = 0;
                if (this.curNum == 1) {
                    addNum = 1;
                } else if (this.curNum == this.totalNum - 1) {
                    addNum = this.totalNum - 4;
                } else {
                    addNum = this.curNum - 2;
                }
                this.pagination.find('a').each(function(index, el) {
                    if ($(this).hasClass('pager-pagi-num')) {
                        $(this).text(addNum);
                        addNum++;
                    }
                });
            $pagiNumLink.each(function() {
                    if ($(this).text() == that.curNum) {
                        $(this).addClass('on').siblings().removeClass('on');
                    }
                });
        }
    })
    $.fn.pager = function(option) {
        new Pager($(this), option);
    };
})(jQuery);