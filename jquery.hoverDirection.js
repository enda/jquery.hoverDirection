/*
 * jQuery hoverDirection plugin
 * @version: 1.0
 * @author: Jerome Musialak <jerome@musialak.fr> - http://www.musialak.fr
 */

(function($) {
    $.fn.hoverDirection = function (handlerIn, handlerOut) {
	var oldPosition = {pageX : 0, pageY : 0};

	$(document).mousemove(function (e) {
	    oldPosition.pageX = e.pageX;
	    oldPosition.pageY = e.pageY;
	});

	return this.each(
	    function () {
		var $this = $(this);
		var direction = "top";
		var offset = $this.offset();
		var grid = {
		    top: offset.top,
		    left: offset.left,
		    bottom: offset.top + $this.height(),
		    right: offset.left + $this.width()
		};
		$(this).hover(function(e) {
		    if (oldPosition.pageX > grid.left && oldPosition.pageX < grid.right)
		    {
			direction = "top";
			if (e.pageY <= oldPosition.pageY)
			    direction = "bottom";
		    }
		    else
		    {
			direction = "right";
			if (e.pageX >= oldPosition.pageX)
			    direction = "left";
		    }

		    if (handlerIn)
			handlerIn.apply(this, [direction]);
		}, function(e) {
		    if (e.pageX == grid.right)
			direction = "right";
		    else if (e.pageX == grid.left)
			direction = "left";
		    else if (e.pageY == grid.bottom)
			direction = "bottom";
		    else
			direction = "top";

		    if (handlerOut)
			handlerOut.apply(this, [direction]);
		});
	    });
    };
})(jQuery);
