$(document).ready(function() {
  var dialog = $("#dialog").dialog({
    uiLibrary: "bootstrap",
    resizable: true,
    minWidth: 200,
    maxWidth: 600,
    minHeight: 200,
    maxHeight: 450,
    height: 350,
    modal: false
  });

  $("#txt_firstCapital").keyup(function() {
    var str = jQuery("#txt_firstCapital").val();

    var spart = str.split(" ");
    for (var i = 0; i < spart.length; i++) {
      var j = spart[i].charAt(0).toUpperCase();
      spart[i] = j + spart[i].substr(1);
    }
    jQuery("#txt_firstCapital").val(spart.join(" "));
  });

  $("#myCarousel").carousel({
    interval: 3000
  });
});

var password = $("#password");
var button = $("#button");

button.mousedown(function() {
  password.attr("type", "text");
});

button.mouseup(function() {
  password.attr("type", "password");
});

button.mouseleave(function() {
  password.attr("type", "password");
});

if (
  navigator.userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
  )
) {
  //alert('Mobile device detected!');

  button.on("touchstart", function() {
    password.attr("type", "text");
  });

  button.on("touchend", function() {
    password.attr("type", "password");
  });
}

var password = $("#password");
var button = $("#button");

button.mousedown(function() {
  password.attr("type", "text");
});

button.mouseup(function() {
  password.attr("type", "password");
});

button.mouseleave(function() {
  password.attr("type", "password");
});

if (
  navigator.userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
  )
) {
  //alert('Mobile device detected!');

  button.on("touchstart", function() {
    password.attr("type", "text");
  });

  button.on("touchend", function() {
    password.attr("type", "password");
  });
}

var passwords = $("#passwords");
var buttons = $("#buttons");

buttons.mousedown(function() {
  passwords.attr("type", "text");
});

buttons.mouseup(function() {
  passwords.attr("type", "password");
});

buttons.mouseleave(function() {
  passwords.attr("type", "password");
});

if (
  navigator.userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
  )
) {
  //alert('Mobile device detected!');

  buttons.on("touchstart", function() {
    passwords.attr("type", "text");
  });

  buttons.on("touchend", function() {
    passwords.attr("type", "password");
  });
}
