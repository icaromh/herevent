angular
    .module("hereventApp")
    .controller('placeEventDetailModalController', placeEventDetailModalController);

placeEventDetailModalController.inject = ['$mdDialog', 'eventos'];
function placeEventDetailModalController($mdDialog, eventos) {
    var vm = this;

    vm.init = init;

    vm.init();
    vm.cancelar = cancelar;

    function init() {
        vm.eventos = angular.copy(eventos);
    };

    function cancelar() {
        $mdDialog.cancel();
    };
};