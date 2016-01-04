/**
 * Created by bourges on 04/01/16.
 */
///<reference path="app.ts"/>

module service {

    export interface Message {
        data: {
            name: string,
            developers: string[],
            votes: string[],
            allVoted: boolean,
            choices: string[]
        }
    }

    export class ApiService {

        private baseUrl;
        private baseHttpUrl;
        private baseWsUrl;
        private httpService;
        private webSocketService: WebSocketService;

        static $inject = ["$http", "$location", "$websocket"];
        constructor($http: ng.IHttpService, $location: ng.ILocationService, $websocket: WebSocketService) {
            this.baseUrl = "://"
                + $location.host() + ':'
                + $location.port()
//                    + 8080
                + "/";
            this.baseHttpUrl = $location.protocol() + this.baseUrl + "api/v1/";
            this.baseWsUrl = "ws" + this.baseUrl + "team?teamName=";
            this.httpService = $http;
            this.webSocketService = $websocket;
        }

        sendDev(teamName, devName, voted, vote) {
            var data = {
                name: devName,
                voted: voted,
                vote: vote
            };
            this.httpService.put(this.baseHttpUrl + teamName + "/" + devName, data)
        }

        deleteDev(teamName, devName) {
            this.httpService.delete(this.baseHttpUrl + teamName + "/" + devName)
        }

        cleanVotes(teamName) {
            this.httpService.post(this.baseHttpUrl + teamName + "/clean-votes")
        }

        setChoices(teamName, choices) {
            this.httpService.post(this.baseHttpUrl + teamName + "/set-choices", choices)
        }

        getWs(team) {
            return this.webSocketService(this.baseWsUrl + team);
        }

    }

    app.MyApp.service('ApiService', ApiService);
}
