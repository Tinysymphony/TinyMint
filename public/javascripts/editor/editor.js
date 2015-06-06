
var barFontSize = "180%";

var segmentCount = 3;

$(document).ready(function(){

	if($(document).width() > 1000){
		$("#editorBoard").css("width", "90%");
		$("#editorBar").css("width", "10%");
		$(".Segment").css("font-size", "180%");
	} 
	else{
		$("#editorBoard").css("width", "80%");
		$("#editorBar").css("width", "20%");
		$(".Segment").css("font-size", "80%");	
	}

	$("#fun2").click(function(){
		var scrollTo = $("#seg7");
		var container = $("#editorBoard");
		var distance = scrollTo.offset().top - container.offset().top + container.scrollTop();
		$("#editorBoard").animate({scrollTop: distance}, 500);
	});

	$("#fun1").click(function(){
		$("#editorBoard").animate({scrollTop:"+=100"}, 500);
	});


	$("#toTop").click(function(){
		$("#editorBoard").animate({scrollTop:$("#seg1").offset().top},500);
	});


	$("#appendNew").mouseover(function(){
		$(this).animate({opacity:'0.7'},"fast");
	});
	$("#appendNew").mouseleave(function(){
		$(this).animate({opacity:'1.0'},"fast");
	});



	$(".HeadButton").mouseover(function(){
		$(this).css("background-color", "#333333");
	});
	$(".HeadButton").mouseleave(function(){
		$(this).css("background-color", "black");
	});

	$(".MainLink").mouseover(function(){
		$(this).css("background-color", "rgb(138,107,190)");
	});
	$(".MainLink").mouseleave(function(){
		$(this).css("background-color", "rgb(106,76,156)");
	});

	$(".ShareMenu").mouseover(function(){
		$(this).css("background-color", "rgb(138,107,190)");
	});
	$(".ShareMenu").mouseleave(function(){
		$(this).css("background-color", "rgb(106,76,156)");
	});

	$("#hide").click(function(){
		$("#editor").animate({left:'-30%'},"slow");
		$("#result").animate({width:'90%'},"slow");
		$("#hide").animate({opacity:'0.2'},"slow");
		$("#show").animate({opacity:'1'},"slow");

	});

	$("#show").click(function(){
		$("#editor").animate({left:'0'},"slow");
		$("#result").animate({width:'60%'},"slow");
		$("#hide").animate({opacity:'1'},"slow");
		$("#show").animate({opacity:'0.2'},"slow");
	});

	$("#appendNew").click(function(){
		segmentCount += 1;
		var newSegment = "<div class='Segment'id='seg" + segmentCount + "'>Appended</div>";
		var container = $("#editorBoard");
		var scrollTo = null;

		if($(".Selected").length != 0){
			$(newSegment).insertAfter($(".Selected"));
			scrollTo = $(".Selected").next(); 
		}else{
			$("#SegmentHolder").append(newSegment);
			scrollTo = $("#SegmentHolder").children(":last");
		}

		scrollTo.css("font-size", barFontSize);
		var distance = scrollTo.offset().top - container.offset().top + container.scrollTop() - 40;
		container.animate({scrollTop: distance}, 500);

		setTimeout(setSelect(),0);
		scrollTo.addClass("Selected");
		scrollTo.css({"background-color":"#EEDC82"});
		$(".Segment").not(scrollTo).removeClass("Selected");
		$(".Segment").not(scrollTo).css({"background-color":"#fff"});

	});

    $("#backToDashboard").click(function(){
        window.location = '/dashboard';
    });

	setSelect();

});


function setSelect(){
	$(".Segment").click(function(){
		$(this).addClass("Selected");
		$(this).css({"background-color":"#EEDC82"});
		$(".Segment").not(this).removeClass("Selected");
		$(".Segment").not(this).css({"background-color":"#fff"});
	});
}

$(window).resize(function(){
	if($(document).width() > 1000){
		barFontSize = "180%";

		$("#editorBoard").css("width", "90%");
		$("#editorBar").css("width", "10%");
		$(".Segment").css("font-size", "180%");
	} 
	else{
		barFontSize = "80%";
		$("#editorBoard").css("width", "80%");
		$("#editorBar").css("width", "20%");
		$(".Segment").css("font-size", "80%");	
	}

	// $(".Pic").css("height", $(".Pic").next().css("height"));

});

