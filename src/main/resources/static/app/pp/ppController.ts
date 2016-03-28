/**
 * Created by bourges on 04/01/16.
 */
///<reference path="../app.ts"/>

module pp {

    class PpController {
        private message:service.Message;
        private choisesAsString:String;
        private currentTeam;
        private currentDev;
        private $scope;
        private webSocketService: WebSocketService;

        static $inject = ['$routeParams', 'ApiService', '$scope', 'pathPrefix'];
        constructor($routeParams:angular.route.IRouteParamsService, private apiService:service.ApiService, $scope:ng.IScope, private pathPrefix:string) {
            
            this.message = {data: {name: "", developers: [], votes: [], allVoted: false, choices: []}};
            this.choisesAsString = "";
            this.currentTeam = $routeParams['team'];
            this.currentDev = $routeParams['dev'];
            this.$scope = $scope;
            //WebSocket
            this.webSocketService = this.apiService.getWs(this.pathPrefix, this.currentTeam);
            this.webSocketService.onMessage(mess => this.onMessageCallBack(mess));
            this.webSocketService.onOpen(() => this.onOpenCallBack());
        }

        public getDevs() {
            return this.message.data.developers;
        }

        public getTeam() {
            return this.message.data;
        }

        public vote(choice) {
            this.apiService.sendDev(this.pathPrefix, this.currentTeam, this.currentDev, true, choice);
        }

        public deleteDev(dev) {
            this.apiService.deleteDev(this.pathPrefix, this.getTeam().name, dev.name)
        }

        public cleanVotes() {
            this.apiService.cleanVotes(this.pathPrefix, this.getTeam().name);
            console.log('==>' + this.$scope.rbo);
        }

        public setChoices() {
            this.apiService.setChoices(this.pathPrefix, this.getTeam().name, this.choisesAsString.split("|"));
            $('#config').hide();
        }

        public getNbVotes(choice) {
            var ret = "?";
            if (this.getTeam().allVoted) {
                ret = this.getTeam().votes[choice];
            }
            return ret;
        }

        public isVoteMax(choice) {
            var ret = true;
            for (var vote in this.getTeam().votes) {
                var nbVote = this.getTeam().votes[vote];
                ret = ret && nbVote <= this.getTeam().votes[choice];
            }
            return ret;
        }

        private onMessageCallBack(mess) {
            this.message.data = JSON.parse(mess.data);
            this.getDevs().map(dev => this.parseDev(dev));
            this.parseTeam(this.getTeam());
            this.choisesAsString = this.getTeam().choices.join('|');
        }

        private onOpenCallBack() {
            this.apiService.sendDev(this.pathPrefix, this.currentTeam, this.currentDev, false, -1);
        }

        private parseDev(dev) {
            dev.isMe = false;
            if (dev.name == this.currentDev) {
                dev.isMe = true;
            }
            return dev;
        }

        private parseTeam(team) {
            team.allVoted = true;
            team.votes = {};
            team.choices.forEach(function (choice) {
                team.votes[choice] = 0;
            });
            team.developers.forEach(function (dev) {
                team.allVoted = team.allVoted && dev.voted;
                team.votes[dev.vote]++;
            });
            if (team.lastAction != 'UPDATE_DEV') {
                this.$scope.$broadcast('timer-start');
            }
            if (team.allVoted) {
                this.$scope.$broadcast('timer-stop');
            }
            return team;
        }

    }

    app.MyApp.controller('PpController', PpController);
}