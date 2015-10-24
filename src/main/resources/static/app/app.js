(function () {
    'use strict';
    angular.module('agileTeam', ['ngWebSocket'])
        .factory('Ws', function($websocket) {
            // Open a WebSocket connection
            var ws = $websocket('ws://localhost:8080/team?teamName=gfc');

            var message = {data: {}};

            ws.onMessage(function(mess) {
                message.data = JSON.parse(mess.data);
            });

            return {
                message: message,
                status: function() {
                    return ws.readyState;
                }
            };
        })
        .controller('MainController', MainController);

    MainController.$inject = [
        '$scope',
        'Ws'
        ];
    function MainController ($scope, Ws) {
        var vm = this;
        vm.test = "ICI";
        vm.ws = Ws;
    }
})();