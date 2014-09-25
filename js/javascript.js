$(function() {

    $("#slider" ).slider({
      min: 0,
      max: 15,
      slide: function( event, ui ) {
        $( "#patients_amount" ).text( ui.value );
      }
    });

    window.location.hash = "#slide_0";

    var startTransitionForSlide = function(slide) {
        var transitives = slide.find("[data-transition-order]").sort(function(a, b) {
            return a.getAttribute('data-transition-order') > b.getAttribute('data-transition-order') ? 1 : -1;
        });
        //console.log(transitives);
        var startTransition = function() {
        	//console.log("this = ", this);
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
        console.log("transitives[0] = ", transitives[0]);

        if (transitives.length)
        	startTransition.call($(transitives[0]));
    }

    $(".next").click(function(){
    	var href = $(this).attr("href");

    	console.log(window.location.hash);

    	$("." + window.location.hash.substr(1)).hide();
    	
    	$("." + href.substr(1)).show();

    	startTransitionForSlide($(href));
    });
});
