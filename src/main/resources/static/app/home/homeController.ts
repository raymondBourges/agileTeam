/**
 * Created by bourges on 04/01/16.
 */
///<reference path="../app.ts"/>

module Home {

    interface Model {
        team: String,
        dev: String
    }

    class HomeController {

        private model:Model;
        private locationService;

        static $inject = ['$location'];
        constructor($location:ng.ILocaleService) {
            this.locationService = $location;
            this.model = {
                team: "",
                dev: ""
            }
        }

        public go() {
            if (this.isFormOk()) {
                this.locationService.path(this.model.team + "/" + this.model.dev);
            }
        }

        public isFormOk() {
            return this.model.team.length > 0 && this.model.dev.length > 0
        }

    }

    app.MyApp.controller('HomeController', HomeController);
}