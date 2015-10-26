(function () {
    'use strict';

    angular
        .module('homeController', [])
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
        '$location'
    ];
    function HomeCtrl($location) {
        var vm = this;
        vm.model = {
            team:"test",
            dev:"dev"
        };
        vm.go = go;

        function go() {
            if (vm.model.team && vm.model.dev) {
                $location.path(vm.model.team + "/" + vm.model.dev);
            }
        }

    }
})();