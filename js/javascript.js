$(function(){

  $(".outside_right").on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
    $(".outside_left").removeClass("outside_left");
  });

  $(".outside_left").on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
    $(".transparent").removeClass("transparent");
  });

  $(".outside_right").removeClass("outside_right");
});