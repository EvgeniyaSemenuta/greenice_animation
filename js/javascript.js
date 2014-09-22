$(function() {
    //var transitives = [$("#slide_3 .transitive-0"), $("#slide_3 .transitive-1"), $("#slide_3 .transitive-2"), $("#slide_3 .transitive-3"), $("#slide_3 .transitive-4")];

    var transitivesLength = $("#slide_3 [class*=transitive-]").length;

    for (var i = 0; i < transitivesLength - 1; i++) {
        (function(currentIndex, nextIndex) {

            var currentNode = $("#slide_3 .transitive-" + currentIndex);
            var nextNode = $("#slide_3 .transitive-" + nextIndex);

            currentNode.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                nextNode.addClass("transitive");
                nextNode.removeClass("transitive-" + nextIndex);

                e.stopPropagation();
            });
        })(i, i + 1)
    }

    $("#slide_3 .transitive-0").addClass("transitive");
    $("#slide_3 .transitive-0").removeClass("transitive-0");
});
