(function () {
    'use strict';
    angular.module('agileTeam', ['ngWebSocket'])
        .factory('Messages', function($websocket) {
            // Open a WebSocket connection
            var ws = $websocket('ws://localhost:8080/team?teamName=gfc');

            var collection = [];

            ws.onMessage(function(message) {
                collection.push(JSON.parse(message.data));
            });

            return {
                collection: collection,
                status: function() {
                    return ws.readyState;
                }
            };
        })
        .controller('MainController', MainController);

    MainController.$inject = [
        '$scope',
        'Messages'
        ];
    function MainController ($scope, Messages) {
        var vm = this;
        vm.test = "ICI";
        vm.messages = Messages;
    }
})();