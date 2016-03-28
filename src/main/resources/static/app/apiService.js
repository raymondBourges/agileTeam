/**
 * Created by bourges on 04/01/16.
 */
///<reference path="app.ts"/>
var service;
(function (service) {
    var ApiService = (function () {
        function ApiService($http, $location, $websocket) {
            this.$location = $location;
            this.httpService = $http;
            this.webSocketService = $websocket;
        }
        ApiService.prototype.sendDev = function (pathPrefix, teamName, devName, voted, vote) {
            var data = {
                name: devName,
                voted: voted,
                vote: vote
            };
            this.httpService.put(this.getBaseHttpUrl(pathPrefix) + teamName + "/" + devName, data);
        };
        ApiService.prototype.deleteDev = function (pathPrefix, teamName, devName) {
            this.httpService.delete(this.getBaseHttpUrl(pathPrefix) + teamName + "/" + devName);
        };
        ApiService.prototype.cleanVotes = function (pathPrefix, teamName) {
            this.httpService.post(this.getBaseHttpUrl(pathPrefix) + teamName + "/clean-votes");
        };
        ApiService.prototype.setChoices = function (pathPrefix, teamName, choices) {
            this.httpService.post(this.getBaseHttpUrl(pathPrefix) + teamName + "/set-choices", choices);
        };
        ApiService.prototype.getWs = function (pathPrefix, team) {
            console.log('-->', this.getBaseWsUrl(pathPrefix));
            return this.webSocketService(this.getBaseWsUrl(pathPrefix) + team);
        };
        ApiService.prototype.getBaseHttpUrl = function (pathPrefix) {
            return this.$location.protocol() + this.getBaseUrl(pathPrefix) + "api/v1/";
        };
        ApiService.prototype.getBaseWsUrl = function (pathPrefix) {
            var protocol = this.$location.protocol() == "http" ? "ws" : "wss";
            return protocol + this.getBaseUrl(pathPrefix) + "team?teamName=";
        };
        ApiService.prototype.getBaseUrl = function (pathPrefix) {
            var ret = "://"
                + this.$location.host() + ':'
                + this.$location.port()
                + pathPrefix;
            //            ret = "://localhost:8080/";
            return ret;
        };
        ApiService.$inject = ["$http", "$location", "$websocket"];
        return ApiService;
    }());
    service.ApiService = ApiService;
    app.MyApp.service('ApiService', ApiService);
})(service || (service = {}));
//# sourceMappingURL=apiService.js.map