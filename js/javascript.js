$(function() {
    //var transitives = [$("#slide_3 .transitive-0"), $("#slide_3 .transitive-1"), $("#slide_3 .transitive-2"), $("#slide_3 .transitive-3"), $("#slide_3 .transitive-4")];
    var slide = $("#slide_3");
    
    var transitives = slide.find("[data-transition-order]").sort(function(a, b) {
        return a.getAttribute('data-transition-order') > b.getAttribute('data-transition-order') ? 1 : -1;
    });

    var startTransition = function() {
    	this.addClass("transitive").
             removeClass("transitive-" + this.data("transition-order"));
    }

    for (var i = 0; i < transitives.length - 1; i++) {
        (function(currentNode, nextNode) {
            currentNode.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                startTransition.call(nextNode);
                e.stopPropagation();
            });
        })($(transitives[i]), $(transitives[i + 1]))
    }

    startTransition.call($(transitives[0]));
});
