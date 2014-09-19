$(function() {
    var transitives = [$(".transitive-0"), $(".transitive-1"), $(".transitive-2")];

    for (var i = 0; i < transitives.length - 1; i++) {
		(function(currentIndex, nextIndex){
	        transitives[currentIndex].on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
	            transitives[nextIndex].removeClass("transitive-" + nextIndex);
	        });
		})(i, i + 1)
    }

    transitives[0].removeClass("transitive-0");
});
