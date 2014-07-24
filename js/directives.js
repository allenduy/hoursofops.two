app.directive('square', ['$interval', function ($interval) {
   return {
      scope: {
         place: '='
      },
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/square',
      link: function(scope, element, attrs) {
         scope.place.timeLeft = 'loading...';
         scope.place.opening_hours = scope.place.opening_hours || undefined; // info unavailable
         if (scope.place.opening_hours !== undefined
            && scope.place.opening_hours.periods.length === 7
            && scope.place.opening_hours.open_now) {
            $interval(function(){
               var now = new Date();
               var day = now.getDay();
               scope.place.timeLeft = (scope.place.opening_hours.periods[day].close.nextDate - now);
            }, 1000);
         };
      }
   };
}]);