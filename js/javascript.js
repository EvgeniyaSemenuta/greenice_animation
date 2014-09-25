$(function() {

    $("#slider").slider({
        min: 0,
        max: 15,
        slide: function(event, ui) {
            $("#patients_amount").text(ui.value);
        }
    });

    var startTransitionForSlide = function(slide) {
        var transitives = slide.find("[data-transition-order]").sort(function(a, b) {
            return a.getAttribute('data-transition-order') > b.getAttribute('data-transition-order') ? 1 : -1;
        });
        var startTransition = function() {
            this.addClass("transitive").removeClass("transitive-" + this.data("transition-order"));
        }

        for (var i = 0; i < transitives.length - 1; i++) {
            (function(currentNode, nextNode) {
                currentNode.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                    startTransition.call(nextNode);
                    e.stopPropagation();
                });
            })($(transitives[i]), $(transitives[i + 1]));
        }

        setTimeout(function() {
            if (transitives.length)
                startTransition.call($(transitives[0]));
        }, 0);
    }

    var resetTransitionsForSlide = function(slide) {
        var transitives = slide.find("[data-transition-order]");

        transitives.each(function() {
            var transitive = $(this);
            transitive.addClass("transitive-" + transitive.data("transition-order")).removeClass("transitive");
        });
    }

    window.location.hash = "#slide_0";
    startTransitionForSlide($(window.location.hash));

    $(".next").click(function() {
        var href = $(this).attr("href");

        $("." + window.location.hash.substr(1)).hide();

        resetTransitionsForSlide($(window.location.hash));

        $("." + href.substr(1)).show();

        startTransitionForSlide($(href));
    });
});
