app.controller('MainController', ['$scope', '$interval', 'placesService', function ($scope, $interval, placesService) {
  $scope.detailedPlaces = [];
  var verifyCompletion = $interval(function(){
    if (placesService.getVerif()) {
      $interval.cancel(verifyCompletion);
      $scope.detailedPlaces = placesService.getPlaces();
    };
  }, 700);
}]);