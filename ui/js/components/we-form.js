var we = we || {};

we.form = (function () {
    var formData = null,
        selector = 'form.we-edit-form:first';

    function init() {
        formData = $(selector).serialize();
        $(selector).change(inputChanged);
        $(selector).find('input[type=text], textarea, input[type=password]').keyup(inputChanged);
        $(selector).on('reset', onFormReset);
    }

    function inputChanged() {
        var $form = $(this).closest(selector);
        formChanged($form);
    }

    function formChanged($form) {
        $form = sanitizeFormElement($form);
        if($form.length == 0) {
            return;
        }

        var newFormData = $form.serialize();

        if (newFormData != formData) {
            $form.addClass('modified');
        }
        else {
            $form.removeClass('modified');
        }
    }

    function onFormReset() {
        var $form = $(this);

        beforeReset();
        setTimeout(function() {
            afterReset($form);
        }, 0);
    }

    function beforeReset() {
    }

    function afterReset($form) {
        formChanged($form);
    }

    function sanitizeFormElement($form) {
        if($form == undefined || $form == null || !($form instanceof jQuery) || $form.length == 0) {
            $form = $(selector);
        }

        return $form;
    }

    return {
        init: init
    };
})();