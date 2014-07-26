app.filter('formatTime', function() {
   // filter used for time length of given milliseconds (input), not 24 hour time
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

      for (var i in time) time[i] = (time[i] < 10) ? '0' + time[i] : time[i];

      // return hh:mm:ss
      return time[0] + ':' + time[1] + ':' + time[2];
   };
});

app.filter('formatName', function() {
   // filter splits name by first 13 characters then resizes font to max with of container
   return function(input) {
      var name = input.split(' ');
      if (true) {};
      return parent.width();
   }
});