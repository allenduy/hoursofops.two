myApp.directive('square', function () {
   return {
      scope: {
         place: '='
      },
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/square',
      link: function(scope, element, attrs) {
         // $scope.timeLeft.opening_hours = ($scope.place.opening_hours !undefined) ? $scope.place.opening_hours[0]. : "undefined";
      }
   }
});