(function () {
    'use strict';

    angular
        .module('apiService', [
        ])
        .service('apiService', apiService);

    apiService.$inject = [
        '$http',
        '$websocket',
        '$location'
    ];
    function apiService($http, $websocket, $location) {
        var srv = this;
        srv.sendDev = sendDev;
        srv.getWs = getWs;

        var baseUrl = "://"
            + $location.host() + ':'
//            + $location.port()
            + 8080
            + "/";
        var baseHttpUrl = $location.protocol() + baseUrl + "api/v1/";
        var baseWsUrl = "ws" + baseUrl + "team?teamName=";

        function sendDev(team, dev, voted, vote) {
            var data = {
                name: dev,
                voted: voted,
                vote: vote
            };
            $http.put(baseHttpUrl + team + "/" + dev, data)
        }

        function getWs(team) {
            return $websocket(baseWsUrl + team);
        }

    }
})();