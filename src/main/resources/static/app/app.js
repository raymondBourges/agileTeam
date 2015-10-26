(function () {
    'use strict';
    angular.module('agileTeam',
        [
            'ngWebSocket',
            'ngRoute',
            'wipController',
            'ppController'
        ])
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
                        templateUrl: 'app/wip/wip.html',
                        controller: 'WipCtrl',
                        controllerAs: 'ctrl'
                    }).
                    when('/:team/:dev', {
                        templateUrl: 'app/pp/pp.html',
                        controller: 'PpCtrl',
                        controllerAs: 'ctrl'
                    }).
                    otherwise({
                        redirectTo: '/wip'
                    });
            });
})();