$( ".screen1 .instrumentsoverview .cont .customslider .slide2" ).click(function() {
  $(".screen1 .instrumentsoverview .cont .customslider .slide1").addClass("moveperv");

  $(".screen1 .instrumentsoverview .cont .dots .activeone").removeClass("activeone");
  $(".screen1 .instrumentsoverview .cont .dots .slide2").addClass("activeone");
});
$( ".screen1 .instrumentsoverview .cont .dots .slide2" ).click(function() {
  $(".screen1 .instrumentsoverview .cont .customslider .slide1").addClass("moveperv");

  $(".screen1 .instrumentsoverview .cont .dots .activeone").removeClass("activeone");
  $(".screen1 .instrumentsoverview .cont .dots .slide2").addClass("activeone");
});
$( ".screen1 .instrumentsoverview .cont .dots .slide1" ).click(function() {
  $(".screen1 .instrumentsoverview .cont .customslider .slide1").removeClass("moveperv");

  $(".screen1 .instrumentsoverview .cont .dots .activeone").removeClass("activeone");
  $(".screen1 .instrumentsoverview .cont .dots .slide1").addClass("activeone");
});

$( ".screen1 .instrumentsoverview .cont .customslider .slide1" ).click(function() {
  $(".screen1 .instrumentsoverview .cont .customslider .slide1").removeClass("moveperv");

  $(".screen1 .instrumentsoverview .cont .dots .activeone").removeClass("activeone");
  $(".screen1 .instrumentsoverview .cont .dots .slide1").addClass("activeone");
});










$( ".screen1 .instrumentsoverview .topside .closex" ).click(function() {
  $(".screen1 .instrumentsoverview").removeClass("instrumentsoverview_active");
  vid.play();
});
$( ".screen1 .instrumentspopup" ).click(function(e) {
  e.preventDefault();
  $(".screen1 .instrumentsoverview").addClass("instrumentsoverview_active");
  vid.pause();
});



$( ".screen1 .instructionsforuse .topside .closex" ).click(function(e) {
	e.preventDefault();
  $(".screen1 .instructionsforuse").removeClass("instructionsforuse_active");
  vid.play();
});
$( ".screen1 .instructionsforusepopup" ).click(function(e) {
  e.preventDefault();
  $(".screen1 .instructionsforuse").addClass("instructionsforuse_active");
  vid.pause();
});












$( ".contentarea_begin .cont .customslider .slide2" ).click(function() {
  $(".contentarea_begin .cont .customslider .slide1").addClass("moveperv");

  $(".contentarea_begin .cont .dots .activeone").removeClass("activeone");
  $(".contentarea_begin .cont .dots .slide2").addClass("activeone");
});
$( ".contentarea_begin .cont .dots .slide2" ).click(function() {
  $(".contentarea_begin .cont .customslider .slide1").addClass("moveperv");

  $(".contentarea_begin .cont .dots .activeone").removeClass("activeone");
  $(".contentarea_begin .cont .dots .slide2").addClass("activeone");
});
$( ".contentarea_begin .cont .dots .slide1" ).click(function() {
  $(".contentarea_begin .cont .customslider .slide1").removeClass("moveperv");

  $(".contentarea_begin .cont .dots .activeone").removeClass("activeone");
  $(".contentarea_begin .cont .dots .slide1").addClass("activeone");
});

$( ".contentarea_begin .cont .customslider .slide1" ).click(function() {
  $(".contentarea_begin .cont .customslider .slide1").removeClass("moveperv");

  $(".contentarea_begin .cont .dots .activeone").removeClass("activeone");
  $(".contentarea_begin .cont .dots .slide1").addClass("activeone");
});









