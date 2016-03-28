/**
 * Created by bourges on 04/01/16.
 */
///<reference path="../app.ts"/>
var pp;
(function (pp) {
    var PpController = (function () {
        function PpController($routeParams, apiService, $scope, pathPrefix) {
            var _this = this;
            this.apiService = apiService;
            this.pathPrefix = pathPrefix;
            this.message = { data: { name: "", developers: [], votes: [], allVoted: false, choices: [] } };
            this.choisesAsString = "";
            this.currentTeam = $routeParams['team'];
            this.currentDev = $routeParams['dev'];
            this.$scope = $scope;
            //WebSocket
            this.webSocketService = this.apiService.getWs(this.pathPrefix, this.currentTeam);
            this.webSocketService.onMessage(function (mess) { return _this.onMessageCallBack(mess); });
            this.webSocketService.onOpen(function () { return _this.onOpenCallBack(); });
        }
        PpController.prototype.getDevs = function () {
            return this.message.data.developers;
        };
        PpController.prototype.getTeam = function () {
            return this.message.data;
        };
        PpController.prototype.vote = function (choice) {
            this.apiService.sendDev(this.pathPrefix, this.currentTeam, this.currentDev, true, choice);
        };
        PpController.prototype.deleteDev = function (dev) {
            this.apiService.deleteDev(this.pathPrefix, this.getTeam().name, dev.name);
        };
        PpController.prototype.cleanVotes = function () {
            this.apiService.cleanVotes(this.pathPrefix, this.getTeam().name);
            console.log('==>' + this.$scope.rbo);
        };
        PpController.prototype.setChoices = function () {
            this.apiService.setChoices(this.pathPrefix, this.getTeam().name, this.choisesAsString.split("|"));
            $('#config').hide();
        };
        PpController.prototype.getNbVotes = function (choice) {
            var ret = "?";
            if (this.getTeam().allVoted) {
                ret = this.getTeam().votes[choice];
            }
            return ret;
        };
        PpController.prototype.isVoteMax = function (choice) {
            var ret = true;
            for (var vote in this.getTeam().votes) {
                var nbVote = this.getTeam().votes[vote];
                ret = ret && nbVote <= this.getTeam().votes[choice];
            }
            return ret;
        };
        PpController.prototype.onMessageCallBack = function (mess) {
            var _this = this;
            this.message.data = JSON.parse(mess.data);
            this.getDevs().map(function (dev) { return _this.parseDev(dev); });
            this.parseTeam(this.getTeam());
            this.choisesAsString = this.getTeam().choices.join('|');
        };
        PpController.prototype.onOpenCallBack = function () {
            this.apiService.sendDev(this.pathPrefix, this.currentTeam, this.currentDev, false, -1);
        };
        PpController.prototype.parseDev = function (dev) {
            dev.isMe = false;
            if (dev.name == this.currentDev) {
                dev.isMe = true;
            }
            return dev;
        };
        PpController.prototype.parseTeam = function (team) {
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
        };
        PpController.$inject = ['$routeParams', 'ApiService', '$scope', 'pathPrefix'];
        return PpController;
    }());
    app.MyApp.controller('PpController', PpController);
})(pp || (pp = {}));
//# sourceMappingURL=ppController.js.map