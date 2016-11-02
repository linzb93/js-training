(function($) {
    var d = {
        cell: 'li',
        count: 10,
        pagination: '',
    };

    function Pager($this, option){
        this.$this = $this;
        this.o = $.extend({}, d, option);
        this.$perCell = this.$this.find(this.o.cell);
        this.$pagination = $(this.o.pagination);
        this.totalNum = countTotalPage(this.$perCell, this.o.count);
        this.curNum = 1;
        this.prevNum = 1;
        var $firstLink, $prevLink, $nextLink, $lastLink, $pagiNumLink;
        this.init();
        this.getCurPage();
    }
    function countTotalPage(ele, count) {
        return Math.ceil(ele.length / count) + 1;
    }
    function canHidePrev(cur) {
        return cur < 3;
    }
    function canHideNext(cur, total) {
        return total - cur < 4;
    }

    $.extend(Pager.prototype, {
        init: function() {
            this.$perCell.hide();
            for (var i = 0; i < this.o.count; i++) {
                this.$perCell.eq(i).show();
            }
            this.createPager(0);
        },
        createPager: function(curNum) {
            var pageHtml = '';
            var i, j = 0;
            var tot = Math.min(this.totalNum, 5);
            if (canHidePrev(curNum)) {
                i = 1;
            } else if (canHideNext(curNum, this.totalNum)) {
                i = this.totalNum - 5;
            } else {
                i = curNum - 1;
            }
            pageHtml += '<a class="pager-pagi-first pager-btn" href="#">首页</a>';
            pageHtml += '<a class="pager-pagi-prev pager-btn" href="#">上一页</a>';
            for (; j < tot - 1; i++) {
                pageHtml += '<a class="pager-pagi-num" href="#">' + i + '</a>';
                j++;
            }
            pageHtml += '<a class="pager-pagi-next pager-btn" href="#">下一页</a>';
            pageHtml += '<a class="pager-pagi-last pager-btn" href="#">尾页</a>';
            this.$pagination.append(pageHtml);
            $firstLink = $('.pager-pagi-first');
            $prevLink = $('.pager-pagi-prev');
            $nextLink = $('.pager-pagi-next');
            $lastLink = $('.pager-pagi-last');
            $pagiNumLink = $('.pager-pagi-num');
            if (curNum === 0) {
                $pagiNumLink.eq(0).addClass('on');
            } else {
                $pagiNumLink.each(function(i) {
                if ($(this).text() == curNum) {
                    $pagiNumLink.eq(i + 1).addClass('on');
                }
                return;
            })
            }
            if (canHidePrev(curNum)) {
                $firstLink.hide();
                $prevLink.hide();
            } else if (canHideNext(curNum, this.totalNum)) {
                $nextLink.hide();
                $lastLink.hide();
            }
        },
        getCurPage: function() {
            var that = this;
            this.$pagination.on('click', 'a', function() {
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
                        that.curNum = that.totalNum;
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
                this.$perCell.eq(i).hide();
            }
            for (var i = (this.curNum - 1) * this.o.count; i < this.curNum * this.o.count; i++) {
                this.$perCell.eq(i).show();
            }
            this.prevNum = this.curNum;

            //分页器变换
            this.$pagination.empty();
            this.createPager(this.curNum - 1);
        }
    })
    $.fn.pager = function(option) {
        new Pager($(this), option);
    };
})(jQuery);