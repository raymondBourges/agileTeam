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
            team:"",
            dev:""
        };
        vm.go = go;
        vm.isFormOk = isFormOk;

        function go() {
            if (isFormOk()  ) {
                $location.path(vm.model.team + "/" + vm.model.dev);
            }
        }

        function isFormOk() {
            return vm.model.team.length > 0 && vm.model.dev.length > 0
        }

    }
})();