

$(document).ready(function(){

    var isFold = false;

    $("#right").click(function(){
        if(isFold){
            $("#editor").animate({left:'0'},"slow");
            $("#result").animate({width:'60%'},"slow");
            isFold = false;
        }
    });

    $("#left").click(function(){
        if(!isFold){
            $("#editor").animate({left:'-30%'},"slow");
            $("#result").animate({width:'90%'},"slow");
            isFold = true;
        }
    });

    $("#add").click(function(){

    });

});

$(window).resize(function(){


});