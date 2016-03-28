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

        private httpService;
        private webSocketService: WebSocketService;

        static $inject = ["$http", "$location", "$websocket"];
        constructor($http: ng.IHttpService, private $location: ng.ILocationService, $websocket: WebSocketService) {
            this.httpService = $http;
            this.webSocketService = $websocket;
        }

        sendDev(pathPrefix, teamName, devName, voted, vote) {
            var data = {
                name: devName,
                voted: voted,
                vote: vote
            };
            this.httpService.put(this.getBaseHttpUrl(pathPrefix) + teamName + "/" + devName, data)
        }

        deleteDev(pathPrefix, teamName, devName) {
            this.httpService.delete(this.getBaseHttpUrl(pathPrefix) + teamName + "/" + devName)
        }

        cleanVotes(pathPrefix, teamName) {
            this.httpService.post(this.getBaseHttpUrl(pathPrefix) + teamName + "/clean-votes")
        }

        setChoices(pathPrefix, teamName, choices) {
            this.httpService.post(this.getBaseHttpUrl(pathPrefix) + teamName + "/set-choices", choices)
        }

        getWs(pathPrefix, team) {
            console.log('-->', this.getBaseWsUrl(pathPrefix));
            return this.webSocketService(this.getBaseWsUrl(pathPrefix) + team);
        }

        private getBaseHttpUrl(pathPrefix:string) {
            return this.$location.protocol() + this.getBaseUrl(pathPrefix) + "api/v1/";
        }

        private getBaseWsUrl(pathPrefix:any) {
            var protocol = this.$location.protocol() == "http" ? "ws" : "wss";
            return protocol + this.getBaseUrl(pathPrefix) + "team?teamName=";
        }

        private getBaseUrl(pathPrefix:string) {
            var ret:string = "://"
                + this.$location.host() + ':'
                + this.$location.port()
                + pathPrefix;
//            ret = "://localhost:8080/";
            return ret;
        }

    }

    app.MyApp.service('ApiService', ApiService);
}
