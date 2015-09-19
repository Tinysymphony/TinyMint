$(function() {
  $("a.login").click(function() {
    $("#signupSection").animate({top: "-550px"}, 200);
    $("#loginSection").animate({top: "150px"}, 300);
  });

  $('.closeRec span').click(function() {
    $(this).parents('.CenterRec').animate({top: "-550px"}, 300);
  });

  $("a.signup").click(function() {
    $("#loginSection").animate({top: "-550px"}, 200);
    $("#signupSection").animate({top: "150px"}, 300);
  });

  $("#loginButton").click(function(){
    var loginfo = {
      login: 1,
      username: $("#username1").val(),
      password: $("#password1").val()
    };
    $.ajax({
      data: loginfo,
      type: "POST",
      url: "/",
      async: false,
      dataType: 'text',
      cache: false,
      timeout: 5000,
      success: function (data) {
        var getData = $.parseJSON(data);
        console.log(getData);
        if(getData.info) {
          $("#infoA").text(getData.info);
          if(getData.link) {
              window.location=getData.link;
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown){
        var info = textStatus + " " + errorThrown;
        alert(info);
        $("#infoA").text(info);
      }
    });
  });

  $("#signupButton").click(function(){
    var signInfo = {
      signup: 1,
      username: $("#username2").val(),
      email: $("#email").val(),
      password: $("#password2").val(),
      repassword: $("#password3").val()
    };
    $.ajax({
      data: signInfo,
      type: "POST",
      url: "/",
      dataType: 'text',
      cache: false,
      timeout: 5000,
      success: function (data) {
        var getData = $.parseJSON(data);
        if(getData.info) {
          $("#infoB").text(getData.info);
          if(getData.link) {
            window.location = getData.link;
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown){
        var info = textStatus + " " + errorThrown;
        $("#infoB").text(info);
      }
    });
  });
});
