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
        srv.deleteDev = deleteDev;
        srv.cleanVotes = cleanVotes;
        srv.setChoices = setChoices;
        srv.getWs = getWs;

        var baseUrl = "://"
            + $location.host() + ':'
            + $location.port()
//            + 8080
            + "/";
        var baseHttpUrl = $location.protocol() + baseUrl + "api/v1/";
        var baseWsUrl = "ws" + baseUrl + "team?teamName=";

        function sendDev(teamName, devName, voted, vote) {
            var data = {
                name: devName,
                voted: voted,
                vote: vote
            };
            $http.put(baseHttpUrl + teamName + "/" + devName, data)
        }

        function deleteDev(teamName, devName) {
            $http.delete(baseHttpUrl + teamName + "/" + devName)
        }

        function cleanVotes(teamName) {
            $http.post(baseHttpUrl + teamName + "/clean-votes")
        }

        function setChoices(teamName, choices) {
            $http.post(baseHttpUrl + teamName + "/set-choices", choices)
        }

        function getWs(team) {
            return $websocket(baseWsUrl + team);
        }

    }
})();