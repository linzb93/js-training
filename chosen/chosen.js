/*

*/
(function($) {
    var d = {
        width: 150,
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
    }

    Chosen.prototype.handlePrevSelect = function() {
        this.$this.hide();
        this.$this.children().each(function() {
            this.selectArr.text.push($(this).text());
            this.selectArr.value.push($(this).attr('value'));
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
        this.$this.append(selectHtml);
    };

    Chosen.prototype.bindEvent = function() {
        this.$this.find('chosen-select-main').on('click', function() {
            $(this).parent().addClass('on');
        });
    };
    $.fn.chosen = function(option) {
        new Chosen($(this), option);
    };
})(jQuery);