angular
    .module("hereventApp")
    .controller('homeController', homeController);
homeController.inject = ['NgMap', '$scope', 'mapService','dialogService'];

function homeController(NgMap, $scope, mapService, dialogService) {

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDVNt3mf6OrpUyjCftuo2Mdh_c5bZRIGkw&libraries=places";

    var vm = this;

    vm.init = init;
    vm.init();

    $scope.hereMarker;
    $scope.optionsGetLocation = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    var infoWindow;
    var service;
    $scope.markers = [];
    window.term = "cultura";
    $scope.placeCache;

    function init() {
         getUserLocation();
         initMap();
    };

    $scope.listaEventos;


    function getUserLocation() { navigator.geolocation.getCurrentPosition(successGetLocation, this.errorGetLocation, $scope.optionsGetLocation); }
   

    function successGetLocation (pos) {
        setTimeout(2000);
        //var latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        var latLng = new google.maps.LatLng(-30.035059, -51.226507);
         //Define a latitude e longitude atual do usuário
        centralizaMarker(latLng); //Move o mapa para a coordenada definida na linha anterior
    }   
    
    function errorGetLocation (err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    function centralizaMarker(latLng){
         NgMap.getMap().then(function(map) {
            map.setCenter(latLng);
            map.setZoom(15);

            if ($scope.hereMarker == null) {
                criarHereEventMarker(latLng);
            } else {
                $scope.hereMarker.setPosition(latLng);
                $scope.hereMarker.setMap(map);
                //Mapa.circle5Km.setCenter(latLng);
                //Mapa.circle5Km.setMap(this.objMapa);
            }
        });
    }
    function initMap(){
        NgMap.getMap().then(function(map) {
            infoWindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);

            // The idle event is a debounced event, so we can query & listen without
            // throwing too many requests at the server.
            map.addListener("idle", performSearch);
        });
    }

    function performSearch() {
        NgMap.getMap().then(function(map) {
        var request = {
            bounds: map.getBounds(),
            keyword: window.term
        };
        service.radarSearch(request, callback);
      });
    }

    
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0, result; (result = results[i]); i++) {
        addMarker(result);
    }
  }
}

function setMapOnAll(map) {
    NgMap.getMap().then(function(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    });
}

function clearMarkers() {
  setMapOnAll(null);
}

function addMarker(place) {
    var placeDetails;
    var retorno;
    service.getDetails(place, function(result, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
        placeDetails = result;

        var callbackSucesso = function(response){
            retorno = response.data;

            if(retorno != undefined && retorno.length > 0){
                    NgMap.getMap().then(function(map) {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location,
                        icon: "assets/img/eventMarker.png",
                        animation: google.maps.Animation.DROP,
                    });

                $scope.markers.push(marker);

                google.maps.event.addListener(marker, "click", function() {
                    infoWindow.setContent(placeDetails.name);
                    infoWindow.open(map, marker);
                    
                    var callbackConfirmado = function () {};
                    var callbackCancelado = function () { };

                        var modalDialog = {
                            controller: placeEventDetailModalController,
                            controllerAs: 'vm',
                            templateUrl: 'modules/home/placeEventDetailModal.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose: false,
                            fullscreen: false,
                            locals: {
                                eventos: retorno,
                            }
                        };

                        dialogService.modal(modalDialog).then(callbackConfirmado, callbackCancelado);
                    
                    $scope.listaEventos = retorno;
                });
            });
            }
        };

        mapService.consultarEventos(placeDetails.name).then(callbackSucesso);

        }
    
    });
}

function criarHereEventMarker (latLng){
    NgMap.getMap().then(function(map) {
        vm.hereMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "Você está aqui.",
            icon: "assets/img/marker.png"
            });
    });
    }
};