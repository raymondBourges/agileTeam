(function () {
    'use strict';

    angular
        .module('wipController', [])
        .controller('WipCtrl', WipCtrl);

    WipCtrl.$inject = [
        '$scope',
        'Ws'
    ];
    function WipCtrl($scope, Ws) {
        var vm = this;
        vm.test = "ICI";
        vm.ws = Ws;
    }
})();