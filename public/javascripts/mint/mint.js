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

});

