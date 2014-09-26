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

    $("#slider").slider({
        min: 0,
        max: 15,
        slide: function(event, ui) {
            $("#patients_amount").text(ui.value);
        }
    });

    $("a.dead").click(function(e) {
        e.preventDefault();
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
                if (isTransitionSupported) {
                    currentNode.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                        startTransition.call(nextNode);
                        e.stopPropagation();
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

    var openSecondSlide = function() {
        setTimeout(function() {
            $("#slide_0 .next").click();
            window.location.hash = "#slide_1";
        }, 3000);
    }

    if (isTransitionSupported) {
        $("#slide_0 [data-transition-order=2]").on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', openSecondSlide);
    } else {
    	openSecondSlide();
    	$("a[href='#slide_0']").click(openSecondSlide);
    }

    $(".next").click(function() {
        var href = $(this).attr("href");

        $("." + window.location.hash.substr(1)).hide();

        resetTransitionsForSlide($(window.location.hash));

        $("." + href.substr(1)).show();

        startTransitionForSlide($(href));
    });
});
