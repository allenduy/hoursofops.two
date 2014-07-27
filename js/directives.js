app.directive('square', function ($interval) {
  return {
    scope: {
      place: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'partials/square',
    link: function(scope, element, attrs) {
      // initialize status with 'loading...'
      scope.place.timeLeft = 'loading...';
      var i = 0;

      // initial check for existing properties or 24 hours stores
      // then begins timer if otherwise
      if (scope.place.opening_hours === undefined) {
        scope.place.timeLeft = 'no info';
      }
      else if (scope.place.opening_hours.periods[0].open.time === '0000') {
        scope.place.timeLeft = 'open all day';
      else {
        var timer = $interval(function() { scope.place.timeLeft = getStatus(); }, 1000);
      }

      function getStatus() {
        if (true) {};
      }







      // // check for existing key in obj
      // if (!('opening_hours' in scope.place)) {
      //   scope.place.timeLeft = status[0];
      // // check if open 24 hours
      // } else if (scope.place.opening_hours.periods[0].open.time === '0000') {
      //   scope.place.timeLeft = 'Open 24 Hours';
      // } else {
      //   var periods = scope.place.opening_hours.periods;
      //   var periodLength = periods.length;



      //   $interval(function(){



      //     var now = new Date();
      //     day = now.getDay();
      //     var index = -2;
      //     var indexPrev = -2;
      //     (function() {
      //       for (var i in periods) {
      //         if (periods[i].open.day === day) {
      //           index = parseInt(i);
      //           indexPrev = (periods[(i + periodLength - 1) % periodLength].open.day === day - 1) ? (i + periodLength - 1) % periodLength : -1;
      //         } else if (i === periodLength - 1) {
      //           index = -1;
      //         };
      //       };
      //     })();

      //     if (index === -1 || (index === -1 && indexPrev === -1)) {
      //       scope.place.timeLeft = status[3];
      //     } else if () {

      //     } else {
      //       var close = periods[index].close.nextDate;
      //       var closeLast = (indexPrev >= 0) ? periods[indexPrev].close.nextDate : 0;
      //       if (close <= now || closeLast <= now) {
      //         scope.place.timeLeft = status[0];
      //         // $interval.cancel(timer);
      //       } else if (closeLast > now) {
      //         scope.place.timeLeft = (closeLast - now);
      //       } else {
      //         scope.place.timeLeft = (close - now);
      //       };
      //     };



      //   }, 1000);
      // };


    }
  };
});