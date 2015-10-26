(function () {
    'use strict';

    angular
        .module('ppController', [
            'ngWebSocket'
        ])
        .controller('PpCtrl', PpCtrl);

    PpCtrl.$inject = [
        '$routeParams',
        '$websocket',
        '$location'
    ];
    function PpCtrl($routeParams, $websocket, $location) {
        var vm = this;
        vm.message = {data: {}};

        //WebSocket
        var ws = $websocket('ws://' + $location.host() + ':' + /*$location.port()*/8080 + '/team?teamName=' + $routeParams.team);
        ws.onMessage(function(mess) {
            vm.message.data = JSON.parse(mess.data);
        });
    }
})();