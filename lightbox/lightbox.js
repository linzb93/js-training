(function($) {
    $.fn.lightbox = function(opt) {
        var defaults = {
            overlay: 'overlay',
            close: 'close',
            loadSrc: function() {}
        };
        var option = $.extend({}, defaults, opt);
        var isCreated = false;
        var $self = this;
        var $lightbox = '';
        init();

        function init() {
            $self.find('img').on('click', function() {
                var imgSrc = $(this).attr('src');
                if (!isCreated) {
                    create(imgSrc);
                    isCreated = true;
                } else {
                    reset(imgSrc);
                }
            });
        }

        function create(src) {
            var src1 = option.loadSrc(src);
            var html = '<div class="lightbox"><div class="' + option.overlay + '"></div><div class="lightbox-main"><a class="' + option.close + '" href="javascript:;">×</a><img src="' + src1 + '"></div></div>';
            $('body').append(html);
            $lightbox = $('.lightbox');
            $lightbox.find('.close').on('click', function() {
                $lightbox.hide();
            })
        }

        function reset(src) {
            var src1 = option.loadSrc(src);
            $lightbox.find('img').attr('src', src1);
            $lightbox.show();
        }
    };
})(jQuery);