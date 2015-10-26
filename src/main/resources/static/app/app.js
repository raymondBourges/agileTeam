(function () {
    'use strict';
    angular.module('agileTeam', ['ngWebSocket', 'ngRoute', 'wipController'])
        .factory('Ws', function($websocket, $location) {
            // Open a WebSocket connection
            var ws = $websocket('ws://' + $location.host() + ':' + /*$location.port()*/8080 + '/team?teamName=gfc');

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
        .config(
            function($routeProvider) {
                $routeProvider.
                    when('/wip', {
                        templateUrl: 'partials/wip.html',
                        controller: 'WipCtrl',
                        controllerAs: 'ctrl'
                    }).
                    when('/:team/:dev', {
                        templateUrl: 'partials/pp.html',
                        controller: 'ppCtrl'
                    }).
                    otherwise({
                        redirectTo: '/wip'
                    });
            });
})();