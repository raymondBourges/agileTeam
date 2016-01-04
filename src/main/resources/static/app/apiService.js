/**
 * Created by bourges on 04/01/16.
 */
///<reference path="app.ts"/>
var service;
(function (service) {
    var ApiService = (function () {
        function ApiService($http, $location, $websocket) {
            this.baseUrl = "://"
                + $location.host() + ':'
                + $location.port()
                + "/";
            this.baseHttpUrl = $location.protocol() + this.baseUrl + "api/v1/";
            this.baseWsUrl = "ws" + this.baseUrl + "team?teamName=";
            this.httpService = $http;
            this.webSocketService = $websocket;
        }
        ApiService.prototype.sendDev = function (teamName, devName, voted, vote) {
            var data = {
                name: devName,
                voted: voted,
                vote: vote
            };
            this.httpService.put(this.baseHttpUrl + teamName + "/" + devName, data);
        };
        ApiService.prototype.deleteDev = function (teamName, devName) {
            this.httpService.delete(this.baseHttpUrl + teamName + "/" + devName);
        };
        ApiService.prototype.cleanVotes = function (teamName) {
            this.httpService.post(this.baseHttpUrl + teamName + "/clean-votes");
        };
        ApiService.prototype.setChoices = function (teamName, choices) {
            this.httpService.post(this.baseHttpUrl + teamName + "/set-choices", choices);
        };
        ApiService.prototype.getWs = function (team) {
            return this.webSocketService(this.baseWsUrl + team);
        };
        ApiService.$inject = ["$http", "$location", "$websocket"];
        return ApiService;
    })();
    service.ApiService = ApiService;
    app.MyApp.service('ApiService', ApiService);
})(service || (service = {}));
//# sourceMappingURL=apiService.js.map