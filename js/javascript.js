$(function() {
    var transitives = [$("#slide_2 .transitive-0"), $("#slide_2 .transitive-1"), $("#slide_2 .transitive-2"), $("#slide_2 .transitive-3"), $("#slide_2 .transitive-4"), $("#slide_2 .transitive-5")];

    for (var i = 0; i < transitives.length - 1; i++) {
		(function(currentIndex, nextIndex){
	        transitives[currentIndex].on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
	            transitives[nextIndex - 1].removeClass("transitive");
	            transitives[nextIndex].addClass("transitive");
	            transitives[nextIndex].removeClass("transitive-" + nextIndex);

	            e.stopPropagation();
	        });
		})(i, i + 1)
    }

    transitives[0].addClass("transitive");
    transitives[0].removeClass("transitive-0");
});
