(function () {
    'use strict';

    angular
        .module('Herevent.Service')
        .service('mapService', mapService);

    mapService.inject = ['httpService', 'hereventApi'];
    function mapService(httpService, hereventApi) {
        this.consultarEventos = consultarEventos;

        function consultarEventos(nome) {
            let params = {
                url: hereventApi.search.root + nome
            };

            return httpService.get(params);
        };
    }
})();