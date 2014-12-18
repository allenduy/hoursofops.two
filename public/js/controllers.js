// MainController checks for service completion, then gets data.
app.controller('MainCtrl', ['$location', '$interval', 'placesService', function ($location, $interval, placesService) {
  var ctrl = this;

  // var requestTypes = ['cafe', 'restaurant', 'meal_takeaway', 'meal_delivery', 'bar', 'bakery'];

  // checks if completed then set initial settings
  var verifyCompletion = $interval(function() {
    if (placesService.getVerif()) {
      $interval.cancel(verifyCompletion);
      ctrl.detailedPlaces = placesService.getPlaces();
      $location.path("/home");
    };
  }, 100);
}]);