var we = we || {};

we.select = (function($) {
    var clss = 'we-select';

    function init(opt) {
        opt = opt || {};

        $.extend(opt, {
            minimumResultsForSearch: 5
        });

        var selector = opt.selector || '.' + clss;

        $(selector).select2(opt);
    }

    function clear(selector) {
        set(selector, '');
    }

    function set(selector, value) {
        var $el = selector instanceof jQuery ? selector : $(selector);
        if($el.hasClass(clss) == false) {
            return;
        }

        $el.val(value).trigger('change');
    }

    return {
        init: init,
        clear: clear,
        set: set
    };
})(jQuery);
