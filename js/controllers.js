// MainController checks for service completion, then gets data.
app.controller('MainController', ['$scope', '$interval', 'placesService', function ($scope, $interval, placesService) {
  $scope.detailedPlaces = [];

  // checks if completed,
  var verifyCompletion = $interval(function(){
    if (placesService.getVerif()) {
      $interval.cancel(verifyCompletion);
      $scope.detailedPlaces = placesService.getPlaces();
    };
  }, 700);
}]);