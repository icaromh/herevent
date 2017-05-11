angular
    .module("hereventApp")
    .controller('errosController', errosController);

errosController.$inject = ['eventData', '$mdDialog'];

function errosController(eventData, $mdDialog) {
    var vm = this;

    vm.init = init;
    vm.cancelar = cancelar;
    vm.init();

    function init() {
        vm.message = eventData.message;
        vm.exceptionMessage = eventData.exceptionMessage;
        vm.stackTrace = eventData.stackTrace;
    };
    function cancelar() {
        $mdDialog.cancel();
    };
};