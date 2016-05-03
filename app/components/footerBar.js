/**
 * Created by davidbridges on 4/29/16.
 */
(function() {
    'use strict';

    function FooterBarController() {
        var vm = this;

    }


    var footerBar = {
        bindings: {},
        templateUrl: 'app/components/templates/footerBar.html',
        controller: FooterBarController
    };


    angular
        .module('ebsm')
        .component('footerBar', footerBar)
        .controller('FooterBarController',[FooterBarController]);
}());