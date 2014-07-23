myApp.controller('MainCtrl', ['$scope', '$interval', '$timeout', 'placesService', function ($scope, $interval, $timeout, placesService) {
   $interval(function() {
      $scope.detailedPlaces = placesService.getPlaces();
   }, 100);
}]);