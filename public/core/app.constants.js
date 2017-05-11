(function () {
   'use strict';

   var constHereventApi = {
       healthcheck: {
           root: 'https://herevent.herokuapp.com/healthcheck/'
       },
       search: {
           root: 'https://herevent.herokuapp.com/api/search/'
       }
   };
   angular
       .module("Herevent.Constantes", [])
       .constant('hereventApi', constHereventApi);
})();