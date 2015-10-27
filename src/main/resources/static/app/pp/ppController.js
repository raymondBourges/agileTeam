(function () {
    'use strict';

    angular
        .module('ppController', [
            'ngWebSocket',
            'apiService'
        ])
        .controller('PpCtrl', PpCtrl);

    PpCtrl.$inject = [
        '$routeParams',
        'apiService'
    ];
    function PpCtrl($routeParams, apiService) {
        var vm = this;
        vm.message = {data: {}};
        vm.getDevs = getDevs;
        vm.getTeam = getTeam;
        vm.vote = vote;

        //WebSocket
        var ws = apiService.getWs($routeParams.team);
        ws.onMessage(function(mess) {
            vm.message.data = JSON.parse(mess.data);
            getDevs().map(parseDev);
            parseTeam(getTeam());
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

        function parseDev(dev) {
            dev.isMe = false;
            if (dev.name == $routeParams.dev) {
                dev.isMe = true;
            }
            return dev;
        }

        function parseTeam(team) {
            team.allVoted = true;
            team.developers.forEach(function(dev) {
                team.allVoted = team.allVoted && dev.voted;
            });
            return team;
        }
    }
})();