$(function() {

    var startTransitionForSlide = function(slide) {
        var transitives = slide.find("[data-transition-order]").sort(function(a, b) {
            return a.getAttribute('data-transition-order') > b.getAttribute('data-transition-order') ? 1 : -1;
        });
        console.log(transitives);
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
            })($(transitives[i]), $(transitives[i + 1]));
        }

        startTransition.call($(transitives[0]));
    }($("#slide_4"));
});
