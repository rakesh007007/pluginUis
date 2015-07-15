jQuery.noConflict();
var we = we || {};

we.settings = (function ($) {
    function init() {
        we.form.init();
    }

    return {
        init: init
    };
})(jQuery);

jQuery(function () {
    we.settings.init();
});
