/**
 * Created by bourges on 04/01/16.
 */
///<reference path="../typings/tsd.d.ts"/>
///<reference path="../typings/local/websocket.d.ts"/>
///<reference path="apiService.ts"/>
var app;
(function (app) {
    app.MyApp = angular.module('planningPoker', [
        'ngWebSocket',
        'ngRoute',
        'timer'
    ]);
    app.MyApp.config(function ($routeProvider) {
        $routeProvider.
            when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'ctrl'
        }).
            when('/:team/:dev', {
            templateUrl: 'app/pp/pp.html',
            controller: 'PpController',
            controllerAs: 'ctrl',
            resolve: { pathPrefix: function () {
                    var ret = window.location.pathname;
                    return ret.replace(/index.html$/, '');
                }
            }
        }).
            otherwise({
            redirectTo: '/'
        });
    });
})(app || (app = {}));
//# sourceMappingURL=app.js.map