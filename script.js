$("#activateForm").click(function() {
  $("#supaForm").addClass("formActive");
  $("#step1").addClass("stepOn");
  $("#step1 input").focus();
  return false;
});
$("#step1 .nextArrow").click(function() {
  $("#step1").addClass("stepOff");
  $("#step2").addClass("stepOn");
  $("#step2 input").focus();
  $("hr").addClass("quarter");
});
$("#step2 .nextArrow").click(function() {
  $("#step2").addClass("stepOff");
  $("#step3").addClass("stepOn");
  $("#step3 textarea").focus();
  $("#supaForm").addClass("messageStep");
  $(".firstTitle").attr("id", "removeTitle");
  $(".secondTitle").addClass("addTitle");
  $(".subtitle").attr("id", "removeTitle");
  $(".secondSubtitle").addClass("addSubtitle");
  $("hr").addClass("threeQuarters");
});
$("#step3 .nextArrow").click(function() {
  $("#supaForm").addClass("messageAway");
  $(".secondTitle").attr("id", "removeTitle");
  $(".thirdTitle").addClass("addTitleThird");
  $(".secondSubtitle").attr("id", "removeTitle");
  $("hr").addClass("full");
  $(".rocketContainer").addClass("liftOff");
  $(".skyBG").attr("id", "activeSky");
  $(".clouds").attr("id", "activeClouds");
});

// enter key for next step
jQuery(document).on("keydown", "#step1 input", function(ev) {
  if (ev.which === 13) {
    // Will change backgroundColor to blue as example
    $("#step1").addClass("stepOff");
    $("#step2").addClass("stepOn");
    $("#step2 input").focus();
    $("hr").addClass("quarter");

    // Avoid form submit
    return false;
  }
});
jQuery(document).on("keydown", "#step2 input", function(ev) {
  if (ev.which === 13) {
    // Will change backgroundColor to blue as example
    $("#step2").addClass("stepOff");
    $("#step3").addClass("stepOn");
    $("#step3 textarea").focus();
    $("#supaForm").addClass("messageStep");
    $(".firstTitle").attr("id", "removeTitle");
    $(".secondTitle").addClass("addTitle");
    $(".subtitle").attr("id", "removeTitle");
    $(".secondSubtitle").addClass("addSubtitle");
    $("hr").addClass("threeQuarters");

    // Avoid form submit
    return false;
  }
});

// input focus on next steps
$("#step1 .inputText").keyup(function() {
  var searchQuery = $(this).val();

  if (searchQuery === "") {
    $("#step1 .nextArrow").removeClass("displayBlock");
  } else {
    $("#step1 .nextArrow").addClass("displayBlock");
  }
});
$("#step2 .inputText").keyup(function() {
  var searchQuery = $(this).val();

  if (searchQuery === "") {
    $("#step2 .nextArrow").removeClass("displayBlock");
  } else {
    $("#step2 .nextArrow").addClass("displayBlock");
  }
});
$("#step3 textarea").keyup(function() {
  var searchQuery = $(this).val();

  if (searchQuery === "") {
    $("#step3 .nextArrow").removeClass("displayBlock");
  } else {
    $("#step3 .nextArrow").addClass("displayBlock");
  }
});
