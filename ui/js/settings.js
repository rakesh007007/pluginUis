var we = we || {};

we.settings = (function () {
    function init() {
        we.form.init();
    }

    return {
        init: init
    };
})();

$(function () {
    we.settings.init();
});
