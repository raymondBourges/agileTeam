/**
 * Created by bourges on 04/01/16.
 */

///<reference path="../typings/tsd.d.ts"/>
///<reference path="../typings/local/websocket.d.ts"/>
///<reference path="apiService.ts"/>


module app {

    export var MyApp = angular.module('planningPoker', [
        'ngWebSocket',
        'ngRoute',
        'timer'
    ]);

    MyApp.config(
        ($routeProvider: angular.route.IRouteProvider) => {
            $routeProvider.
                when('/', {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'ctrl'
                }).
                when('/:team/:dev', {
                    templateUrl: 'app/pp/pp.html',
                    controller: 'PpController',
                    controllerAs: 'ctrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
        });
}
