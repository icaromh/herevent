(function () {
    'use strict';

    angular
        .module("hereventApp", ["ngRoute", "ngMaterial", "ngMessages", "ngSanitize", "ngMask", "ui.utils.masks",
            "idf.br-filters", "imageCropper", "duScroll", "Herevent.Service", "Herevent.Constantes", "chieffancypants.loadingBar",
            "ngAnimate","ngMap"])
        .config(function (cfpLoadingBarProvider){
            cfpLoadingBarProvider.includeSpinner = true;
    })
    .run(runApp);

    runApp.$inject = ['$rootScope', '$location', 'dialogService'];

    function runApp($rootScope, $location, dialogService, cfpLoadingBar) {
        $rootScope.$on('httpError', function (event, eventData) {
            var callbackConfirmado = function (retorno) {
                $location.path("/Home/");
            };
            var modalDialog = {
                controller: errosController,
                controllerAs: 'vm',
                templateUrl: 'App/shared/erros/' + eventData.status + '.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: false,
                locals: {
                    eventData: eventData.data
                }
            };

            dialogService.modal(modalDialog).then(callbackConfirmado);
        });
    };
})();