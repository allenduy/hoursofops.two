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
      scope.place.statuses = new function() {
        this.counting = false;
        this.waiting = false;
        this.reset = function() {
          scope.place.statuses.counting = false;
          scope.place.statuses.waiting = false;
        };
        this.wait = function() {
          scope.place.statuses.counting = false;
          scope.place.statuses.waiting = true;
        };
        this.count = function() {
          scope.place.statuses.counting = true;
          scope.place.statuses.waiting = false;
        };
      };

      // defined conditions by name
      // if hours defined, set other variables
      var hoursNotFound = (scope.place.opening_hours === undefined);
      if (!hoursNotFound) {
        var placeNeverCloses = scope.place.opening_hours.periods[0].close === undefined;
        var periods = scope.place.opening_hours.periods;
      };

      // initial check for existing properties or 24 hours stores
      switch (true) {
        case hoursNotFound:
          scope.place.timeLeft = 'no info';
          break;
        case placeNeverCloses:
          scope.place.timeLeft = 'open all day';
          break;
        default:
          $interval(function() {
            // each interval updates time every second then pass in to function
            var time = new Date();
            scope.place.timeLeft = getStatus(time, time.getDay());
          }, 1000);
          break;
      };

      // constant required for difference when checking previous day
      var ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
      var FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;

      // function takes in a date and the day & finds period indexes matching day of open
      function getStatus(now, day) {
        var index = getPeriod(day);
        if (!!index) {
          var open = determineDate(periods[index].open.nextDate);
          var close = determineDate(periods[index].close.nextDate);
        };
        var indexPre = getPeriod((7 + day - 1) % 7);
        if (!!indexPre) {
          var closePre = determineDate(periods[indexPre].close.nextDate);
        };

        // checks for difference in nextDates
        function determineDate(inputDate) {
          var inputTime = new Date(inputDate);
          return (inputTime - now > FOUR_DAYS) ? inputDate - ONE_WEEK : inputDate;
        }

        switch (true) {
          case !!index && !!indexPre: // if now<open {if now<pre, pre-now, else open at ''}, else {if now<close, close-now, else closed}
            if (now < open) {
              if (now < closePre) {
                scope.place.statuses.count();
                return closePre - now;
              } else {
                scope.place.statuses.wait();
                return open;
              };
            } else {
              if (now < close) {
                scope.place.statuses.count();
                return close - now;
              } else {
                scope.place.statuses.reset();
                return 'closed';
              };
            };
            break;
          case !!index && !indexPre: // if now<open, open at '', else {if now < close, close - now, else closed}
            if (now < open) {
              scope.place.statuses.wait();
              return open;
            } else {
              if (now < close) {
                scope.place.statuses.count();
                return close - now;
              } else {
                scope.place.statuses.reset();
                return 'closed';
              };
            };
            break;
          case !index && !!indexPre: // if now < pre, pre - now, else closed
            if (now < closePre) {
              scope.place.statuses.wait();
              return closePre - now;
            } else {
              scope.place.statuses.reset();
              return 'closed';
            };
            break;
          default:
            scope.place.statuses.reset();
            return 'closed';
        };
      }

      // check for period with correct day and return index, otherwise, empty string
      function getPeriod(day) {
        for (var i in periods) {
          if (periods[i].open.day === day) return parseInt(i);
          if (i === periods.length - 1) return '';
        };
      }
    }
  };
});