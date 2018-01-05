(function($) {
    $.fn.i18n = function(dic, lang) {
        $(this).find('[data-i18n]').each(function() {
            var val = $(this).data('i18n');
            $(this).text(dic[val][lang]);
        });
    };
})(jQuery);