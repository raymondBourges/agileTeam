(function () {
    'use strict';
    angular.module('agileTeam', ['ngWebSocket'])
        .factory('MyData', function($websocket) {
            // Open a WebSocket connection
            var dataStream = $websocket('ws://localhost:8080/team?teamName=gfc');

            var collection = [];

            dataStream.onMessage(function(message) {
                //collection.push(JSON.parse(message.data));
                collection.push(message.data);
            }, {autoApply: false});

            var methods = {
                collection: collection,
                get: function() {
                    dataStream.send(JSON.stringify({ action: 'get' }));
                }
            };

            return methods;
        })
        .controller('MainController', MainController);

    MainController.$inject = [
        '$scope',
        'MyData'
        ];
    function MainController ($scope, MyData) {
        var vm = this;
        vm.test = "ICI";

            $scope.message = "ICI";//MyData;
    }
})();