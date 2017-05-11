(function () {
    'use strict';

    angular
        .module('Herevent.Service')
        .service('httpService', httpService);

    httpService.inject = ['$http', '$q', '$log'];
    function httpService($http, $q, $log) {
        var promise;

        this.get = get;
        this.post = post;
        this.put = put;
        this.delete = remove;

        function get(params) {
            var defaultParams = {
                url: null,
                params: null
            };
            var finalParams = angular.extend(defaultParams, params);

            promise = null;
            if (!promise) {
                promise = $http({
                    url: finalParams.url,
                    method: 'GET',
                    params: finalParams.params
                }).then(function(response){
                    return response;
                }).catch(function(error){
                    $log.error("Erro no retorno do servidor: " + error);
                    return $q.reject(error);
                });
            }

            return promise;
        };
        function post(params) {
            var defaultParams = {
                url: null,
                data: null
            };
            var finalParams = angular.extend(defaultParams, params);

            promise = null;
            if (!promise) {
                promise = $http({
                    url: finalParams.url,
                    method: 'POST',
                    data: finalParams.data
                }).then(function(response){
                    return response;
                    }).catch(function (error) {
                    $log.error("Erro no retorno do servidor: " + error);
                    return $q.reject(error);
                });
            }

            return promise;
        };
        function put(params) {
            var defaultParams = {
                url: null,
                data: null
            };
            var finalParams = angular.extend(defaultParams, params);

            promise = null;
            if (!promise) {
                promise = $http({
                    url: finalParams.url,
                    method: 'PUT',
                    data: finalParams.data
                }).then(function(response){
                    return response;
                    }).catch(function(error) {
                    $log.error("Erro no retorno do servidor: " + error);
                    return $q.reject(error);
                });
            }

            return promise;
        };
        function remove(params) {
            var defaultParams = {
                url: null,
                data: null
            };
            var finalParams = angular.extend(defaultParams, params);

            promise = null;
            if (!promise) {
                promise = $http({
                    url: finalParams.url,
                    method: 'DELETE',
                    data: finalParams.data,
                    headers: { 'Content-Type': 'application/json' }
                }).then(function(response){
                    return response;
                    }).catch(function(error){
                    $log.error("Erro no retorno do servidor: " + error);
                    return $q.reject(error);
                });
            }

            return promise;
        };
    }
})();