/*

*/
(function($) {
    var d = {
        placeholder: '请选择'
    };

    function Chosen($this, option) {
        this.$this = $this;
        var o = $.extend({}, d, option);
        this.o = o;

        this.selectArr = {
            value: [],
            text: []
        };

        //init
        this.handlePrevSelect();
        this.createSelectBox();
        this.bindEvent();
    }

    Chosen.prototype.handlePrevSelect = function() {
        var that = this;
        this.$this.hide();
        this.$this.children().each(function() {
            that.selectArr.text.push($(this).text());
            that.selectArr.value.push($(this).attr('value'));
        });
    };

    Chosen.prototype.createSelectBox = function() {
        var selectHtml = '';
        selectHtml += '<div class="chosen-select">';
        selectHtml += '<div class="chosen-select-main">';
        selectHtml += '<span>' + this.o.placeholder + '</span>';
        selectHtml += '<i></i>';
        selectHtml += '</div>';
        selectHtml += '<ul class="chosen-select-list">';
        for (var i = 0, length = this.selectArr.text.length; i < length; i++) {
            selectHtml += '<li data-val=' + this.selectArr.value[i] +'>' + this.selectArr.text[i] + '</li>';
        }
        selectHtml += '</ul>';
        selectHtml += '</div>';
        this.$this.after(selectHtml);
    };

    Chosen.prototype.bindEvent = function() {
        this.$this.next().find('.chosen-select-main').on('click', function() {
            $(this).parent().toggleClass('on');
        });
        this.$this.next().find('li').on('click', function() {
            var chosenText = $(this).text();
            $(this).parents('.chosen-select').removeClass('on').find('span').text(chosenText);
        })
    };

    $.fn.chosen = function(option) {
        new Chosen($(this), option);
    };
})(jQuery);