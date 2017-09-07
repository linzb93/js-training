(function($) {
    $.fn.lottery = function(option) {
        var defaults = {};

        var opt = $.extend({}, defaults, option);
        var ctx = this;
        var length = this.children().length;
        var width = this.width();
        var height = this.height();
        var cellWidth = this.children().width();
        var cellHeight = this.children().height();
        var hMax = Math.floor(width / cellWidth); //水平方向最多能放置的数量
        var vMax = Math.floor(height / cellHeight); //竖直方向最多能放置的数量

        function initLayout() {
            var count = calculateEachNum();
            var hGap = Math.floor((width - cellWidth * count.h) / (count.h - 1));
            var vGap = Math.floor((height - cellHeight * count.v) / (count.v - 1));
            ctx.children().each(function(index) {
                var left = 0;
                var top = 0;
                if (index < length / 2) {
                    if (index < count.h) {
                        left = (cellWidth + hGap) * index;
                        top = 0;
                    } else {
                        left = (cellWidth + hGap) * (count.h - 1);
                        top = (cellHeight + vGap) * (index - count.h + 1);
                    }
                } else {
                    if (index < (count.h * 2 + count.v - 2)) {
                        left = (cellWidth + hGap) * (length - index - count.v + 1);
                        top = (cellHeight + vGap) * (count.v - 1);
                    } else {
                        left = 0;
                        top = (cellHeight + vGap) * (length - index);
                    }
                }
                $(this).css({
                    left: left,
                    top: top
                });
            })
        }

        function calculateEachNum() {
            var hCount = hMax;
            var vCount = (length - hCount * 2) / 2 + 2;

            var hGap = Math.floor((width - cellWidth * hCount) / (hCount - 1));
            var vGap = Math.floor((height - cellHeight * vCount) / (vCount - 1));
            vGap = vGap < 0 ? 9999 : vGap;
            if (hGap === vGap) {
                return {
                    h: hCount,
                    v: vCount
                }
            }
            while(hGap <= vGap) {
                hCount -= 1;
                vCount += 1;
                hGap = Math.floor((width - cellWidth * hCount) / (hCount - 1));
                vGap = Math.floor((height - cellHeight * vCount) / (vCount - 1));
                vGap = vGap < 0 ? 9999 : vGap;
            }
            if (hGap === vGap) {
                return {
                    h: hCount,
                    v: vCount
                }
            }
            return {
                h: hCount + 1,
                v: vCount - 1
            };
        }
        initLayout();

        function lotteryBegin() {}

        return  {
            begin: function() {
                lotteryBegin();
            }
        }

    }
})(jQuery);