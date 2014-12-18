app.directive('card', ['$interval', function ($interval) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'partials/card.html',
    link: function(scope, element, attrs) {
      var x = scope.place;
      var time;

      // initialize status with 'loading...'
      x.timeLeft = '--:--:--';
      x.statuses = {
        counting: false,
        waiting: false,
        reset: function() {
          x.statuses.counting = false;
          x.statuses.waiting = false;
        },
        wait: function() {
          x.statuses.counting = false;
          x.statuses.waiting = true;
        },
        count: function() {
          x.statuses.counting = true;
          x.statuses.waiting = false;
        }
      };

      // defined conditions by name
      // if hours defined, set other variables
      var hoursNotFound = !x.opening_hours;

      if (!hoursNotFound) {
        var placeNeverCloses = !x.opening_hours.periods[0].close;
        var periods = x.opening_hours.periods;
      };
      
      // initial check for existing properties or 24 hours stores
      switch (true) {
        case hoursNotFound:
          x.timeLeft = 'not available';
          break;
        case placeNeverCloses:
          x.timeLeft = 'open all day';
          break;
        default:
          $interval(function() {
            // each interval updates time every second then pass in to function
            time = new Date();
            x.timeLeft = getStatus(time, time.getDay());
          }, 1000);
          break;
      };

      // check for period with correct day and return index, otherwise, empty string
      function getPeriod(day) {
        for (var i in periods) {
          if (periods[i].open.day === day) return parseInt(i);
          if (i === periods.length - 1) return '';
        }
      }

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

        // if case is true for given time, set the status
        switch (true) {
          // if now < open, [if now < pre, pre - now, else open at ''], else [if now < close, close - now, else closed]
          case !!index && !!indexPre:
            if (now < open) {
              if (now < closePre) {
                x.statuses.count();
                return closePre - now;
              } else {
                x.statuses.wait();
                return open;
              }
            } else {
              if (now < close) {
                x.statuses.count();
                return close - now;
              } else {
                x.statuses.reset();
                return 'closed';
              }
            }
            break;
          // if now < open, open at '', else [if now < close, close - now, else closed]
          case !!index && !indexPre:
            if (now < open) {
              x.statuses.wait();
              return open;
            } else {
              if (now < close) {
                x.statuses.count();
                return close - now;
              } else {
                x.statuses.reset();
                return 'closed';
              }
            };
            break;
          // if now < pre, pre - now, else closed
          case !index && !!indexPre:
            if (now < closePre) {
              x.statuses.wait();
              return closePre - now;
            } else {
              x.statuses.reset();
              return 'closed';
            }
            break;
          default:
            x.statuses.reset();
            return 'closed';
        };
      }

      // if photos exist, randomize index from length & set URL, else set none
      if (!!x.photos) {
        var rand = Math.round(Math.random() * (x.photos.length - 1));
        x.photoUrl = x.photos[rand].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
      } else {
        x.photoUrl = '';
      }
    }
  };
}]);

app.directive('logo', [function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/logo.html',
    link: function(scope, element, attrs) {
      console.log(element);
      console.log(scope);
      //console.log(element[0].);
    }
  };
}])

app.directive('load', [function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/loader.html'
  };
}])