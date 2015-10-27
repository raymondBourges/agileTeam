(function () {
    'use strict';

    angular
        .module('ppController', [
            'ngWebSocket',
            'apiService'
        ])
        .controller('PpCtrl', PpCtrl);

    PpCtrl.$inject = [
        '$routeParams',
        'apiService'
    ];
    function PpCtrl($routeParams, apiService) {
        var vm = this;
        vm.message = {data: {}};

        //WebSocket
        var ws = apiService.getWs($routeParams.team);
        ws.onMessage(function(mess) {
            vm.message.data = JSON.parse(mess.data);
        });

        init();

        function init() {
            apiService.sendDev($routeParams.team, $routeParams.dev, false, -1);
        }
    }
})();