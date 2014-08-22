// $( element ).textfill();
(function($) {
	$.fn.textfill = function(maxFontSize) {
		maxFontSize = parseInt(maxFontSize, 10);
		return this.each(function(){
			var ourText = $("span", this);
			function resizefont(){
				var parent = ourText.parent(),
				maxHeight = parent.height(),
				maxWidth = parent.width(),
				fontSize = parseInt(ourText.css("fontSize"), 10),
				multiplier = maxWidth/ourText.width(),
				newSize = (fontSize*(multiplier));
				ourText.css("fontSize", maxFontSize > 0 && newSize > maxFontSize ? maxFontSize : newSize );
			}
			$(window).resize(function(){
				resizefont();
			});
			resizefont();
		});
	};
})(jQuery);