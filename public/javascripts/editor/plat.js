
var segCount = 1;

$(document).ready(function(){

    var isFold = false;

    $("#right").click(function(){
        if(isFold){
            unfold();
            setTimeout(function(){$("#dl-menu").css("left", $("#add").offset().left);}, 800);
            $("#dl-menu").delay(1000).show(1);
            isFold = false;
        }

    });

    $("#left").click(function(){
        if(!isFold){
            fold();
            $("#dl-menu").hide();
            isFold = true;
        }
    });

    $("#titleLine").click(function(){
        segCount += 1;
        var newSegment = "<div class='Segment' id='seg" + segCount + "'>Appended</div>";
        var container = $("#segmentContainer");
        var scrollTo = null;

        if($(".Selected").length==0){
            $("#segmentHolder").append(newSegment);
            scrollTo = $("#segmentHolder").children(":last");
        } else {
            $(newSegment).insertAfter($(".Selected"));
            scrollTo = $(".Selected").next();
        }

        var distance = scrollTo.offset().top - container.offset().top + container.scrollTop() - 80;
        container.animate({scrollTop: distance}, 500);

        setTimeout(setSelect(),0);
        scrollTo.addClass("Selected");
        scrollTo.css({"background-color":"#EEDC82"});
        $(".Segment").not(scrollTo).removeClass("Selected");
        $(".Segment").not(scrollTo).css({"background-color":"#fff"});

    });

    $("#delete").click(function(){
        if($(".Selected").length!=0 && $(".Selected").attr("id")!="seg1"){
            $("#segmentHolder").children(".Selected").remove();
        }
    });

    $("#top").click(function(){
        $("#segmentContainer").animate({scrollTop:$("#seg1").offset().top},500);
    });

    $("#dl-menu").css("left", $("#add").offset().left);

    setSelect();

});

function fold(){
    $("#editor").animate({left:'-30%'},"slow");
    $("#result").animate({width:'90%'},"slow");
}

function unfold(){
    $("#editor").animate({left:'0'},"slow");
    $("#result").animate({width:'60%'},"slow");
}

function setSelect(){
    $(".Segment").click(function(){
        $(this).addClass("Selected");
        $(this).css({"background-color":"#AB4082"});
        $(".Segment").not(this).removeClass("Selected");
        $(".Segment").not(this).css({"background-color":"#fff"});
    });
}

$(window).resize(function(){
    $("#dl-menu").css("left", $("#add").offset().left);
});