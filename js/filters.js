app.filter('formatTime', function(){
	return function(input) {
		// conversion constants (milliseconds, min in hour, sec in min)
		var MS = 1000; var MH = 60; var SM = 60;
		// time array ([hours,min,sec])
		var time = [];

		time.push(Math.floor(input / (MS * MH * SM)));
		time.push(Math.floor((input - (time[0] * MS * MH * SM)) / (MS * MH)));
		time.push(Math.floor((input - (time[0] * MS * MH * SM + time[1] * MS * MH)) / (MS)));

		for (var i in time) time[i] = (time[i] < 10) ? '0' + time[i] : time[i];

		return isNaN(input) ? 'no info' : time[0] + ':' + time[1] + ':' + time[2];
	};
});