// filter used for time length of given milliseconds (input), not 24 hour time
app.filter('formatTime', function() {
   return function(input) {
      // if not a number, leave as is
      if (isNaN(input)) return input;
      // conversion constants (millisec in sec, min in hour, sec in min)
      var MS = 1000; var MH = 60; var SM = 60;
      // time array ([hour,min,sec])
      var time = [];

      time.push(Math.floor(input / (MS * MH * SM))); // hour
      time.push(Math.floor((input - (time[0] * MS * MH * SM)) / (MS * MH))); // min
      time.push(Math.floor((input - (time[0] * MS * MH * SM + time[1] * MS * MH)) / (MS))); // sec

      // time[0] = (time[0] >= 24) ? time[0] - 24 : time[0]; // times that close after midnight

      for (var i in time) {
         time[i] = (time[i] < 10) ? '0' + time[i] : time[i];
         time[i] = (time[i] < 0) ? '00' : time[i];
      };

      // return hh:mm:ss
      return time[0] + ':' + time[1] + ':' + time[2];
   };
});

// filter splits name by first 13 characters then resizes font to max with of container
app.filter('formatName', function() {
   return function(input) {
      if (!input) return input;
      var name = input.split(' ');
      if (name.length < 2) return input;
      var cut = [];

      (function(lastIndex) {
         for (var i = lastIndex; i >= 0; i--) {
            var length = 0;
            
            for (var j = i; j >= 0; j--) {
               length += name[j].length;
            };

            // if (length <= 13) {
            //    cut.push(name.splice(i + 1,).join(' '));
            // };
         };
      })(name.length - 1);

      return cut.join('<br />');
   }
});