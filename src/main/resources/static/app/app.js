(function () {
    'use strict';
    angular.module('planningPoker',
        [
            'ngWebSocket',
            'ngRoute',
            'wipController',
            'ppController',
            'homeController'
        ])
        .config(
            function($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'app/home/home.html',
                        controller: 'HomeCtrl',
                        controllerAs: 'ctrl'
                    }).
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
                        redirectTo: '/'
                    });
            });
})();