$(document).ready(function() {
  $(".btn-view-toggle").on("click", function() {
    // var state = $(this).data("state")
    // console.log(state)
    $(".map").toggleClass("visible hidden");
    $(".list").toggleClass("visible hidden");
    $(".btn-view-toggle").toggleClass("visible hidden");
  });
});
