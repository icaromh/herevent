angular
    .module("hereventApp")
    .controller('homeController', homeController);
homeController.inject = ['NgMap', '$scope', 'mapService','dialogService'];

function homeController(NgMap, $scope, mapService, dialogService) {
  var vm = this;
  var service;

  $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDVNt3mf6OrpUyjCftuo2Mdh_c5bZRIGkw&libraries=places";
  $scope.term = "cultura";
  $scope.hereMarker;
  $scope.markers = [];
  $scope.place = {};
  $scope.sidebar = false;

  vm.init = init;
  vm.init();

  function init() {
    initMap();
  };

  function getUserLocation() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      successGetLocation,
      errorGetLocation,
      options
    );
  }

  function successGetLocation (pos) {
    var latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    centralizaMarker(latLng);
  }

  function errorGetLocation (err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
    var latLng = new google.maps.LatLng(-30.035059, -51.226507);
    centralizaMarker(latLng);
  }

  function centralizaMarker(latLng){
    NgMap
    .getMap()
    .then(function(map) {
      map.setCenter(latLng);
        if ($scope.hereMarker == null) {
          criarHereEventMarker(latLng);
        }
        else {
          $scope.hereMarker.setPosition(latLng);
          $scope.hereMarker.setMap(map);
        }
        performSearch();
      }
    );
  }

  function initMap(){
    NgMap.getMap().then(function(map) {
      service = new google.maps.places.PlacesService(map);
      map.addListener("idle", performSearch);
      getUserLocation();
    });
  }

  function performSearch() {
    NgMap.getMap().then(function(map) {
      var request = {
          bounds: map.getBounds(),
          keyword: $scope.term
      };
      service.radarSearch(request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0, result; (result = results[i]); i++) {
            addMarker(result);
          }
        }
      });
    });
  }

  function setMapOnAll(map) {
    NgMap.getMap().then(function(map) {
      for (var i = 0; i < markers.length; i++) {
        $scope.markers[i].setMap(map);
      }
    });
  }

  function clearMarkers() {
    setMapOnAll(null);
  }

  function addMarker(place) {
    NgMap.getMap().then(function(map) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: "assets/img/eventMarker.png",
        animation: google.maps.Animation.DROP,
      });

      $scope.markers.push(marker);

      google.maps.event.addListener(marker, "click", function() {
        var callbackConfirmado = function () {};
        var callbackCancelado = function () {};
        searchEvents(place);
      });
    });
  }

  function searchEvents(place){
    $scope.loading = true;
    $scope.sidebar = true;
    service.getDetails(place, function(result, status) {
      $scope.place = {
        data: result,
        events: [],
      };

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        mapService
        .consultarEventos(result.name)
        .then(function(response){
          if(response.data != undefined && response.data.length > 0){
            $scope.place.events = response.data;
          }
          console.log($scope.place);
          $scope.loading = false;
        });
      }
    });
  }

  function criarHereEventMarker(latLng) {
    NgMap
    .getMap()
    .then(function(map){
      vm.hereMarker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: "Você está aqui.",
        icon: "assets/img/marker.png"
      });
    });
  }
}
