(function () {
    'use strict';

    angular
        .module('hereventApp')
        .factory('httpLoadingInterceptor', httpLoadingInterceptor)
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$mdDateLocaleProvider'];
    function config($routeProvider, $locationProvider, $httpProvider, $mdDateLocaleProvider) {
        $locationProvider.html5Mode(false);

        $routeProvider
            .when('/', {
                templateUrl: 'modules/home/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .when('/Home/', {
                templateUrl: 'modules/home/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            });

        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        $mdDateLocaleProvider.formatDate = function (date) {
            var m = moment(date);
            return m.isValid() ? m.format('DD/MM/YYYY') : '';
        };

        $httpProvider.interceptors.push('httpLoadingInterceptor');
    };

    httpLoadingInterceptor.$inject = ['$q', '$rootScope'];
    function httpLoadingInterceptor($q, $rootScope) {
        var reqIteration = 0;
        var service = {
            request: request,
            response: response,
            responseError: responseError
        };

        return service;

        function request(config) {

            var skipLoading = config.headers['Skip-Loading'];
            if (skipLoading)
                return config || $q.when(config);

            if (reqIteration === 0)
                $rootScope.$broadcast('globalLoadingStart');

            reqIteration++;
            return config || $q.when(config);
        };
        function response(config) {

            var skipLoading = config.headers('Skip-Loading');
            if (skipLoading)
                return config || $q.when(config);

            reqIteration--;

            if (!reqIteration)
                $rootScope.$broadcast('globalLoadingEnd');

            return config || $q.when(config);
        };
        function responseError(response) {
            var error = false;

            if (response.status == 500 || response.status == 403) {
                error = true;

                var data = response.data || { message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.' };

                if (response.status == 403) {
                    data = {
                        message: 'Ação Inválida',
                        exceptionMessage: response.statusText
                    };
                }
            }

            if (error) {
                reqIteration--;

                if (!reqIteration)
                    $rootScope.$broadcast('globalLoadingEnd');

                $rootScope.$broadcast('httpError', { data: data, status: response.status });
            }

            return $q.reject(response);
        };
    };
})();