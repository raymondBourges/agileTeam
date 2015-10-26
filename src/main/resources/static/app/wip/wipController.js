(function () {
    'use strict';

    angular
        .module('wipController', [
            'ngWebSocket'
        ])
        .controller('WipCtrl', WipCtrl);

    WipCtrl.$inject = [
        '$routeParams',
        '$websocket',
        '$location'
    ];
    function WipCtrl($routeParams, $websocket, $location) {
        var vm = this;
        vm.test = "ICI";
        vm.message = {data: {}};
        var ws = $websocket('ws://' + $location.host() + ':' + /*$location.port()*/8080 + '/team?teamName=gfc');
        ws.onMessage(function(mess) {
            vm.message.data = JSON.parse(mess.data);
        });
    }
})();