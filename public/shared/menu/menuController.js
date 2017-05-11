angular
    .module("hereventApp")
    .controller('menuController', menuController)
    .controller('navMenuController', navMenuController);

function menuController($scope, $mdSidenav) {
    var vm = this;

    $scope.toggleRight = buildToggler('togglerLeft');
    $scope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID).toggle();
        }
    };
}

function navMenuController($scope, $mdSidenav) {
    $scope.close = function () {
        $mdSidenav('togglerLeft').close();
    };
}
