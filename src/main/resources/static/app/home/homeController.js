/**
 * Created by bourges on 04/01/16.
 */
///<reference path="../app.ts"/>
var Home;
(function (Home) {
    var HomeController = (function () {
        function HomeController($location) {
            this.locationService = $location;
            this.model = {
                team: "",
                dev: ""
            };
        }
        HomeController.prototype.go = function () {
            if (this.isFormOk()) {
                this.locationService.path(this.model.team + "/" + this.model.dev);
            }
        };
        HomeController.prototype.isFormOk = function () {
            return this.model.team.length > 0 && this.model.dev.length > 0;
        };
        HomeController.$inject = ['$location'];
        return HomeController;
    })();
    app.MyApp.controller('HomeController', HomeController);
})(Home || (Home = {}));
//# sourceMappingURL=homeController.js.map