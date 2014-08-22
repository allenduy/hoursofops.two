// MainController checks for service completion, then gets data.
app.controller('MainController', ['$interval', 'placesService', function ($interval, placesService) {
  this.detailedPlaces = [];
  this.loading = true;
  var requestTypes = ['cafe', 'restaurant', 'meal_takeaway', 'meal_delivery', 'bar', 'bakery'];

  // checks if completed then set initial settings
  var that = this;
  var verifyCompletion = $interval(function() {
    if (placesService.getVerif()) {
      $interval.cancel(verifyCompletion);
      that.detailedPlaces = placesService.getPlaces();
      that.loading = false;
    };
  }, 500);
}]);