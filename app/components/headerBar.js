/**
 * Created by davidbridges on 4/24/16.
 */
(function() {
    'use strict';

    function HeaderBarController() {
        var vm = this;

        /**
         * @function OpenHelp
         * @desc Opens a Sweet Alert window with the help text displayed
         */
        vm.openHelp = function () {
            swal({
                title: 'Espresso Bar Slot Machine Help',
                text: "Click the blue 'Spin the Wheels!' button. To win, you must get the three components for Coffee," +
                " Espresso or Tea to line up in a row. Any other combination loses.",
                html: true,
                confirmButtonText: 'Got it!',
                confirmButtonColor: '#4682b4',
                closeOnConfirm: true,
                allowOutsideClick: true
            });
        };

    }


    var headerBar = {
        bindings: {},
        templateUrl: 'app/components/templates/headerBar.html',
        controller: HeaderBarController
    };


    angular
        .module('ebsm')
        .component('headerBar', headerBar)
        .controller('HeaderBarController',[HeaderBarController]);
}());