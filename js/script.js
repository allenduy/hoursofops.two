$(document).ready(function () {

	setInterval(function() {
// sets height equal to width
		var width = $('.expanded').width();
		$('.expanded').css('height', width);
	}, 10);

});