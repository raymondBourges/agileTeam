(function () {
    'use strict';

    angular
        .module('ppController', [])
        .controller('PpCtrl', PpCtrl);

    PpCtrl.$inject = [
        '$scope',
        'Ws',
        '$routeParams'
    ];
    function PpCtrl($scope, Ws, $routeParams) {
        var vm = this;
        vm.team = $routeParams.team;
        vm.dev = $routeParams.dev;
    }
})();