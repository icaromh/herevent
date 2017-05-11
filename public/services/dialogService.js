(function () {
    'use strict';

    angular
        .module('Herevent.Service')
        .service('dialogService', dialogService);

    dialogService.$inject = ['$mdDialog', '$q'];

    function dialogService($mdDialog, $q) {

        var promise;
        var service = {
            alert: alert,
            alertHtml: alertHtml,
            confirm: confirm,
            modal: modal
        };

        return service;

        function alert(params) {
            var defaultParams = {
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                title: 'Alert Dialog',
                textContent: 'Content',
                htmlContent: null,
                label: 'Alert Dialog Label',
                ok: 'Close'
            };
            var mergedParams = angular.extend(defaultParams, params);

            $mdDialog.show(
              $mdDialog.alert()
                .parent(mergedParams.parent)
                .clickOutsideToClose(mergedParams.clickOutsideToClose)
                .title(mergedParams.title)
                .textContent(mergedParams.textContent)
                .ariaLabel(mergedParams.label)
                .ok(mergedParams.ok)
            );
        };
        function alertHtml(params) {
            var defaultParams = {
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                title: 'Alert Dialog',
                htmlContent: 'Content',
                label: 'Alert Dialog Label',
                ok: 'Close'
            };
            var mergedParams = angular.extend(defaultParams, params);

            $mdDialog.show(
              $mdDialog.alert()
                .parent(mergedParams.parent)
                .clickOutsideToClose(mergedParams.clickOutsideToClose)
                .title(mergedParams.title)
                .htmlContent(mergedParams.htmlContent)
                .ariaLabel(mergedParams.label)
                .ok(mergedParams.ok)
            );
        };
        function confirm(params) {
            promise = null;

            if (!promise) {
                var defaultParams = {
                    templateUrl: null,
                    title: 'Confirm Dialog',
                    textContent: 'Content',
                    ariaLabel: 'label',
                    targetEvent: null,
                    ok: null,
                    cancel: null
                };
                var mergedParams = angular.extend(defaultParams, params);

                promise = $mdDialog.show(
                  $mdDialog.confirm()
                    .title(mergedParams.title)
                    .textContent(mergedParams.textContent)
                    .ariaLabel(mergedParams.ariaLabel)
                    .targetEvent(mergedParams.targetEvent)
                    .ok(mergedParams.ok)
                    .cancel(mergedParams.cancel)
                );
            }

            return promise;
        };
        function modal(params) {
            promise = null;

            if (!promise) {
                var defaultParams = {
                    controller: null,
                    controllerAs: 'vm',
                    templateUrl: null,
                    parent: angular.element(document.body),
                    targetEvent: null,
                    clickOutsideToClose: true,
                    fullscreen: false,
                    locals: null
                };
                var mergedParams = angular.extend(defaultParams, params);

                promise = $mdDialog.show(mergedParams)
                    .then(function (response) {
                        return response;
                    }).catch(function (error) {
                        return $q.reject(error);
                    });
            }

            return promise;
        };
    }

})();