/*

*/
(function($) {
    var d = {
        placeholder: '请选择',
        option_all: ''
    };

    function Chosen($this, option) {
        this.$this = $this;
        var o = $.extend({}, d, option);
        this.o = o;

        this.selTextArr = [];

        //init
        this.handlePrevSelect();
        this.createSelectBox();
        this.bindEvent();
    }

    Chosen.prototype.handlePrevSelect = function() {
        var that = this;
        this.$this.hide();
        this.$this.children().each(function() {
            that.selTextArr.push($(this).text());
        });
    };

    Chosen.prototype.createSelectBox = function() {
        var selectHtml = '';
        var phWord = '';
        this.$this.children('option').each(function(index) {
            if ($(this).attr('selected') && $(this).text()) {
                phWord = $(this).text();
                return;
            }
        });
        if (!phWord) {
            phWord = this.o.placeholder;
        }

        var optionAll = this.o.option_all ? this.o.option_all : this.o.placeholder;
        this.$this.children('option').first().text(optionAll);
        this.selTextArr[0] = optionAll;

        selectHtml += '<div class="chosen-select">';
        selectHtml += '<div class="chosen-select-main">';
        selectHtml += '<span>' + phWord + '</span>';
        selectHtml += '<i></i>';
        selectHtml += '</div>';
        selectHtml += '<ul class="chosen-select-list">';
        for (var i = 0, length = this.selTextArr.length; i < length; i++) {
            selectHtml += '<li>' + this.selTextArr[i] + '</li>';
        }
        selectHtml += '</ul>';
        selectHtml += '</div>';
        this.$this.after(selectHtml);
    };

    Chosen.prototype.bindEvent = function() {
        var that = this;
        this.$this.next().children('.chosen-select-main').on('click', function() {
            $(this).parent().toggleClass('on').siblings('.chosen-select').removeClass('on');
        });
        this.$this.next().find('li').on('click', function() {
            var chosenText = $(this).text();
            $(this).parents('.chosen-select').removeClass('on').find('span').text(chosenText);
            that.$this.children('option').eq($(this).index()).attr('selected', true).siblings().removeAttr('selected');
            that.$this.trigger('change');
        })
    };

    $.fn.chosen = function(option) {
        $(this).each(function() {
            new Chosen($(this), option);
        });
    };
})(jQuery);