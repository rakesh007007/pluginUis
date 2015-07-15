jQuery.noConflict();

var we = we || {};

we.main = (function ($) {
    function init() {
        we.select.init();
        we.form.init();

        theme.init();
        scenarios.init();
        status.init();
        form.init();
    }

    var theme = (function () {
        function init() {
            $('#selectTheme').change(themeChanged);
        }

        function themeChanged() {
            var $notif = $('.we-preview-notification'),
                newTheme = $('#selectTheme').val(),
                currTheme = $notif.data('theme');

            animate($notif, 'slideOutRight animated', function () {
                $notif.removeClass(currTheme).addClass(newTheme).data('theme', newTheme);
                animate($notif, 'slideInLeft animated');
            });
        }

        function animate($el, clss, callback) {
            $el.addClass(clss).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $el.removeClass(clss);
                if (callback) callback();
            });
        }

        return {
            init: init
        };
    })();

    var scenarios = (function () {
        var scenarioChanging = false;

        function init() {
            $('.we-scenario-input').focus(msgFocus);
            $('.we-scenario-input').keyup(msgChange);
            $('.we-scenario-btn').click(scenarioBtnClick);

            setScenario('scenario1');
        }

        function msgFocus() {
            if (scenarioChanging) {
                scenarioChanging = false;
                return;
            }

            setScenario($(this).data('scenario'));
        }

        function msgChange() {
            setScenarioMessage($(this).val());
        }

        function scenarioBtnClick() {
            setScenario($(this).data('scenario'));
        }

        function setScenario(scenario, force) {
            force = force || false;
            var $preview = $('.we-preview'),
                previousScenario = force ? '' : $preview.data('scenario');

            if (previousScenario == scenario) {
                scenarioChanging = false;
                return;
            }

            scenarioChanging = true;

            $preview.data('scenario', scenario);
            $preview.removeClass(previousScenario).addClass(scenario);

            $('.we-scenario-btn').addClass('inactive');
            var $scenarioBtn = $('.we-scenario-btn.' + scenario);
            $scenarioBtn.removeClass('inactive');

            var $scenarioInput = $('.we-scenario-input.' + scenario);
            setScenarioMessage($scenarioInput.val())
            $scenarioInput.focus();
        }

        function setScenarioMessage(val) {
            val = val || '';
            $('.we-message').text(val);

            if (val == '') {
                $('.we-preview').addClass('inactive');
            }
            else {
                $('.we-preview').removeClass('inactive');
            }
        }

        return {
            init: init,
            set: setScenario
        };
    })();

    var form = (function () {
        var theme = '', coupons = [];

        function init() {
            theme = $('#selectTheme').val();
            coupons = $('#selectCoupons').val();

            $('#notifForm').on('reset', onFormReset);
        }

        function onFormReset() {
            beforeReset();
            setTimeout(function() {
                afterReset();
            }, 0);
        }

        function beforeReset() {
            var $theme = $('#selectTheme'),
                $coupons = $('#selectCoupons');

            if ($theme.val() != theme) {
                we.select.set($theme, theme);
            }

            if (!arraysEqual($coupons.val(), coupons)) {
                we.select.set($coupons, coupons);
            }
        }

        function afterReset() {
            scenarios.set($('.we-preview').data('scenario'), true);
        }

        function arraysEqual(arr1, arr2) {
            arr1 = arr1 || [];
            arr2 = arr2 || [];

            if (arr1.length !== arr2.length)
                return false;
            for (var i = arr1.length; i--;) {
                if (arr1[i] !== arr2[i])
                    return false;
            }

            return true;
        }

        return {
            init: init
        };
    })();

    var status = (function() {
        function init() {
            //$('.we-status-changer').click(changeStatusClick);
        }

        function changeStatusClick() {
            var $this = $(this),
                action = $this.data('action');

            if(action == 'play') {
                play();
                return;
            }

            if(action == 'pause') {
                pause();
                return;
            }

            if(action == 'restart') {
                restart();
                return;
            }
        }

        function play() {
            changeStatusTo('play');
        }

        function pause() {
            changeStatusTo('pause');
        }

        function restart() {
            if(!confirm("This will archive the active campaign's stats and start a new campaign. Continue?")) {
                return;
            }

            changeStatusTo('restart');
            we.select.clear('#selectCoupons');
        }

        function changeStatusTo(status) {
            var $edit = $('.we-edit'),
                currStatus = $edit.data('status');

            $edit.data('status', status);
            $edit.removeClass(currStatus).addClass(status);
        }

        return {
          init: init
        };
    })();

    return {
        init: init
    };
})(jQuery);

jQuery(function () {
    we.main.init();
});
