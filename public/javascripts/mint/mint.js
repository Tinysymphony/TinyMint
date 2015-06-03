$(document).ready(function(){

	$("#turnToRegister").click(function(){
		$("#login").animate({left:"-100%", display:"none"},500);
		$("#signin").animate({top:"0"},500);
        $("#signin").animate({scrollTop:$("#password2").offset().top},500);

	});
	$("#turnToLogin").click(function(){
		$("#login").animate({left:"0", display:"true"},500);
		$("#signin").animate({top:"-100%"},500);
    });

	//$("#aboutContent").load("./text/about/.txt");
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
            dataType: 'text',
            cache: false,
            timeout: 5000,
            success: function (data) {
                var getData = $.parseJSON(data);
                $("#tmpE").remove();
                if(getData.info) {
                    $("#loginForm").before("<div id='tmpE'>" + getData.info + "</div>");
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                var info = 'error ' + textStatus + " " + errorThrown;
                $("#tmpE").remove();
                $("#loginForm").before("<div id='tmpE'>" + info + "</div>");
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
                $("#tmpE").remove();
                if(getData.info) {
                    $("#signupForm").before("<div id='tmpE'>" + getData.info + "</div>");
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                var info = 'error ' + textStatus + " " + errorThrown;
                $("#tmpE").remove();
                $("#signupForm").before("<div id='tmpE'>" + info + "</div>");
            }
        });
    });

});

