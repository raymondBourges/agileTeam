(function () {
    'use strict';

    angular
        .module('ppController', [
            'ngWebSocket',
            'apiService',
            'timer'
        ])
        .controller('PpCtrl', PpCtrl);

    PpCtrl.$inject = [
        '$routeParams',
        'apiService',
        '$scope'
    ];
    function PpCtrl($routeParams, apiService, $scope) {
        var vm = this;
        vm.message = {data: {}};
        vm.getDevs = getDevs;
        vm.getTeam = getTeam;
        vm.vote = vote;
        vm.deleteDev = deleteDev;
        vm.getNbVotes = getNbVotes;
        vm.isVoteMax = isVoteMax;
        vm.cleanVotes = cleanVotes;
        vm.setChoices = setChoices;
        vm.showConfig = showConfig;
        vm.choisesAsString = "";
        vm.isConfingVisible = false;

        //WebSocket
        var ws = apiService.getWs($routeParams.team);
        ws.onMessage(function(mess) {
            vm.message.data = JSON.parse(mess.data);
            getDevs().map(parseDev);
            parseTeam(getTeam());
            vm.choisesAsString = getTeam().choices.join('|');
        });

        init();

        function init() {
            apiService.sendDev($routeParams.team, $routeParams.dev, false, -1);
        }

        function getDevs() {
            return vm.message.data.developers;
        }

        function getTeam() {
            return vm.message.data;
        }

        function vote(choice) {
            apiService.sendDev($routeParams.team, $routeParams.dev, true, choice);
        }

        function deleteDev(dev) {
            apiService.deleteDev(getTeam().name, dev.name)
        }

        function cleanVotes() {
            $scope.$broadcast('timer-start');
            apiService.cleanVotes(getTeam().name)
        }

        function setChoices() {
            apiService.setChoices(getTeam().name, vm.choisesAsString.split("|"));
            vm.isConfingVisible = false;
        }

        function showConfig() {
            vm.isConfingVisible = true;
        }

        function getNbVotes(choice) {
            var ret = "?";
            if (getTeam().allVoted) {
                ret = getTeam().votes[choice];
            }
            return ret;
        }

        function isVoteMax(choice) {
            var ret = true;
            for(var vote in getTeam().votes) {
                var nbVote = getTeam().votes[vote];
                ret = ret && nbVote <= getTeam().votes[choice];
            }
            return ret;
        }

        function parseDev(dev) {
            dev.isMe = false;
            if (dev.name == $routeParams.dev) {
                dev.isMe = true;
            }
            return dev;
        }

        function parseTeam(team) {
            team.allVoted = true;
            team.votes = {};
            team.choices.forEach(function(choice) {
                team.votes[choice] = 0;
            });
            team.developers.forEach(function(dev) {
                team.allVoted = team.allVoted && dev.voted;
                team.votes[dev.vote]++;
            });
            return team;
        }
    }
})();