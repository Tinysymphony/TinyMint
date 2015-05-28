$(document).ready(function(){
	$("#turnToRegister").click(function(){
		$("#login").animate({left:"-100%", display:"none"},500);
		$("#signin").animate({left:"0"},1000);
	});
	$("#turnToLogin").click(function(){
		$("#login").animate({left:"0", display:"true"},1000);
		$("#signin").animate({left:"100%"},500);		
	});

	$("#aboutContent").load("./text/about/.txt");

});

