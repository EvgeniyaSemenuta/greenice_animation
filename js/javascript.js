$(function() {

    var isTransitionSupported = function() {
        var b = document.body || document.documentElement,
            s = b.style,
            p = 'transition';

        if (typeof s[p] == 'string')
            return true;

        var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
        p = p.charAt(0).toUpperCase() + p.substr(1);

        for (var i = 0; i < v.length; i++) {
            if (typeof s[v[i] + p] == 'string')
                return true;
        }

        return false;
    }();

    $(".my_slider").slider({
        min: 0,
        max: 15,
        slide: function(event, ui) {
            $(this).parents(".slider_container").find(".slider_value").text(ui.value);
        }
    });

    $("a.dead").click(function(e) {
        e.preventDefault();
    });

    var startTransitionForSlide = function(slide) {
    	slide.show();

        var transitives = slide.find("[data-transition-order]").sort(function(a, b) {
            return a.getAttribute('data-transition-order') > b.getAttribute('data-transition-order') ? 1 : -1;
        });
        var startTransition = function() {
            this.addClass("transitive").removeClass("transitive-" + this.data("transition-name"));
        }

        for (var i = 0; i < transitives.length - 1; i++) {
            (function(currentNode, nextNode) {
                if (isTransitionSupported) {
                    currentNode.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                        startTransition.call(nextNode);
                        e.stopPropagation();
                        e.preventDefault();
                    });
                } else {
                    setTimeout(function() {
                        startTransition.call(nextNode);
                    }, 500 * (i + 1));
                }
            })($(transitives[i]), $(transitives[i + 1]));
        }

        setTimeout(function() {
            if (transitives.length)
                startTransition.call($(transitives[0]));
        }, 100);
    }

    var resetTransitionsForSlide = function(slide) {
    	slide.hide();

        var transitives = slide.find("[data-transition-order]");

        transitives.each(function() {
            var transitive = $(this);
            transitive.addClass("transitive-" + transitive.data("transition-name")).removeClass("transitive");
        });
    }

    startTransitionForSlide($(".slide:first-child"));

    var openSecondSlide = function() {
        setTimeout(function() {
            $("#slide_0 .next").click();
        }, 3000);
    }

    if (isTransitionSupported) {
        $("#slide_0 [data-transition-order=2]").on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', openSecondSlide);
    } else {
        openSecondSlide();
        $("#slide_0 .next").click(openSecondSlide);
    }

    $(".next").click(function() {
        var currentSlide = $(this).parents(".slide");
        var nextSlide = currentSlide.next(".slide");
        if (nextSlide.length) {
            resetTransitionsForSlide(currentSlide);
            startTransitionForSlide(nextSlide);
        }

    });

    $(".back").click(function() {
        var currentSlide = $(this).parents(".slide");
        var prevSlide = currentSlide.prev(".slide");

        if (prevSlide.length) {
            resetTransitionsForSlide(currentSlide);
            startTransitionForSlide(prevSlide);
        };
    });
});
