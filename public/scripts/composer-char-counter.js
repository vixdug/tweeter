$( document ).ready(function() {
$(".new-tweet").on("keyup", "textarea", function() {
var count = $(".new-tweet").find("textarea").val().length
    var left = 140 - $(".new-tweet").find("textarea").val().length
  var countdown= $(this).parent().find(".counter").text(left)
    if (left < 0) {
      countdown.css({"color":"red"})
    }
})
});
 
