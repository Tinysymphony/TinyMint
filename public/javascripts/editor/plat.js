
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

    //-----Add Button Start-----//
    $("#headLine").click(function(){
        var newSegment = "" +
            "<div class='Segment Seg-Headline row' >" +
            "<div class='col-md-12'>" +
            "<div class='fa fa-quote-left'> Headline</div>" +
            "<hr class='featurette-divider' />" +
            "<div>" +
            "<div class='form-group'>" +
            "<input type='text' id='headline-main-title' placeholder='Main Title' class='form-control'>" +
            "<input type='text' id='headline-subtitle' placeholder='Subtitle' class='form-control'>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        appendSegment(newSegment);
    });

    $("#paragraph").click(function(){
        var newSegment = "" +
            "<div class='Segment Seg-Paragraph row' >" +
            "<div class='col-md-12'>" +
            "<div class='fa fa-pencil'> Paragraph</div>" +
            "<hr class='featurette-divider' />" +
            "<div>" +
            "<div class='form-group'>" +
            "<input type='text' id='paragraph-content' placeholder='Content' class='form-control'>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        appendSegment(newSegment);
    });

    $("#article").click(function(){
        var newSegment = "" +
            "<div class='Segment Seg-Article row' >" +
            "<div class='col-md-12'>" +
            "<div class='fa fa-edit'> Article</div>" +
            "<hr class='featurette-divider' />" +
            "<div>" +
            "<div class='form-group'>" +
            "<textarea id='article-content' class='form-control LongText' placeholder='Paste your article here' onpropertychange='resize(this)' oninput='resize(this)'></textarea>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        appendSegment(newSegment);
    });

    $("#markdown").click(function(){
        var newSegment = "" +
            "<div class='Segment Seg-Markdown row' >" +
            "<div class='col-md-12'>" +
            "<div class='fa fa-list-alt'> Markdown</div>" +
            "<hr class='featurette-divider' />" +
            "<div>" +
            "<div class='form-group'>" +
            "<textarea id='markdown-content' class='form-control LongText' placeholder='Markdown content' onpropertychange='resize(this)' oninput='resize(this)'></textarea>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        appendSegment(newSegment);
    });

    $("#gallery").click(function(){
        var newSegment = "" +
            "<div class='Segment Seg-Gallery row' >" +
                "<div class='col-md-12'>" +
                    "<div class='fa fa-photo'> Gallery</div>" +
                    "<hr class='featurette-divider' />" +
                    "<div>" +
                        "<div class='form-group PictureLink'>" +
                            "<input type='text' placeholder='Picture url' class='form-control'>" +
                             "<input type='text' placeholder='or Upload local Picture' class='form-control'>" +
                        "</div>" +
                        "<a class='btn btn-default UploadButton'>Append</a>" +
                    "</div>" +
                "</div>" +
            "</div>";
        appendSegment(newSegment);
    });

    $("#circles").click(function(){
        var newSegment = "" +
            "<div class='Segment Seg-Circles row' >" +
                "<div class='col-md-12'>" +
                    "<div class='fa fa-photo'> Circles</div>" +
                    "<hr class='featurette-divider' />" +
                    "<div class='row'>" +
                        "<div class='col-md-2'><a class='btn btn-default UploadButton'>Upload</a></div>" +
                        "<div class='col-md-10'>" +
                            "<input type='text' placeholder='Text under picture' class='form-control'>" +
                        "</div>" +
                    "</div>" +
                    "<div class='row'>" +
                        "<div class='col-md-2'><a class='btn btn-default UploadButton'>Upload</a></div>" +
                        "<div class='col-md-10'>" +
                            "<input type='text' placeholder='Text under picture' class='form-control'>" +
                        "</div>" +
                    "</div>" +
                    "<div class='row'>" +
                        "<div class='col-md-2'><a class='btn btn-default UploadButton'>Upload</a></div>" +
                        "<div class='col-md-10'>" +
                            "<input type='text' placeholder='Text under picture' class='form-control'>" +
                        "</div>" +
                    "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";
        appendSegment(newSegment);
    });

    $("#single").click(function(){
        var newSegment = "" +
            "<div class='Segment Seg-Single row' >" +
                "<div class='col-md-12'>" +
                    "<div class='fa fa-photo'> Single</div>" +
                    "<hr class='featurette-divider' />" +
                    "<div>" +
                        "<div class='form-group PictureLink'>" +
                            "<input type='text' placeholder='Picture url' class='form-control'>" +
                            "<input type='text' placeholder='or Upload local Picture' class='form-control'>" +
                            "</div>" +
                                "<a class='btn btn-default UploadButton'>Upload</a>" +
                            "</div>" +
                        "</div>" +
                "</div>" +
            "</div>";
        appendSegment(newSegment);
    });

    $("#music").click(function(){
        if($(".Seg-Music").length!=0){
            alert("music is unique!");
            return;
        }
        var newSegment = "" +
            "<div class='Segment Seg-Music row' >" +
                "<div class='col-md-12'>" +
                    "<div class='fa fa-music'> Music</div>" +
                    "<hr class='featurette-divider' />" +
                    "<input type='text' placeholder='Music Link' class='form-control'>" +
                "</div>" +
            "</div>";
        appendSegment(newSegment);
    });

    $("#video").click(function(){
        var newSegment = "" +
            "<div class='Segment Seg-Video row' >" +
                "<div class='col-md-12'>" +
                    "<div class='fa fa-film'> Video</div>" +
                    "<hr class='featurette-divider' />" +
                    "<input type='text' placeholder='Video Link' class='form-control'>" +
                "</div>" +
            "</div>";
        appendSegment(newSegment);
    });
    //-----Add Button End-----//

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

    $("#refresh").click(function(){
        loadMint();
    });

});

function appendSegment(newSegment){
    segCount += 1;
    var segmentID = "seg" + segCount;
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
    scrollTo.attr("id", segmentID);
    scrollTo.addClass("Selected");
    scrollTo.css({"border":"8px solid #EEC900"});
    $(".Segment").not(scrollTo).removeClass("Selected");
    $(".Segment").not(scrollTo).css({"border":"none"});
}

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
        //$(this).css({"background-color":"#EEC900"});
        $(this).css({"border":"8px solid #EEC900"});
        $(".Segment").not(this).removeClass("Selected");
        //$(".Segment").not(this).css({"background-color":"#fff"});
        $(".Segment").not(this).css({"border":"none"});
    });
}

function loadMint(){

    $("#resultBoard").empty();

    var size = $(".Segment").length;

    for(var i=0; i<size; i++){

        var segment = $("#segmentHolder").children().eq(i);
        var content;

        if(segment.hasClass("DefaultTitle")){

        }else if(segment.hasClass("Seg-Headline")){

                content  = "<div class='jumbotron'><div class='container'>" +
                "<h1>" +
                segment.find("#headline-main-title").val() +
                "</h1>" +
                "<p>" +
                segment.find("#headline-subtitle").val() +
                "</p>" +
                "</div></div>";

        }else if(segment.hasClass("Seg-Paragraph")){

            content = "<div class='container'>" +
            "<p class='lead'>" +
            segment.find("#paragraph-content").val() +
            "</p>" +
            "</div>";

        }else if(segment.hasClass("Seg-Article")){

            content = "<div class='container'><div class='row'>" +
            "<div class='col-lg-12 '>" +
            "<p>" +
            segment.find("#article-content").val() +
            "</p>" +
            "</div>" +
            "</div></div>";

        }else if(segment.hasClass("Seg-Markdown")){

        }else if(segment.hasClass("Seg-Single")){

        }else if(segment.hasClass("Seg-Circles")){

        }else if(segment.hasClass("Seg-Gallery")){

            var id = segment.attr("id");

            content = "<div class='carousel' data-ride='carousel'>" +
            "<ol class='carousel-indicators'>" +
            "<li data-target='#' data-slide-to='0'></li>" +
            "<li data-target='#' data-slide-to='1' class='active'></li>" +
            "<li data-target='#' data-slide-to='2'></li>" +
            "</ol>" +
            "</div>";

        }else if(segment.hasClass("Seg-Music")){

        }else if(segment.hasClass("Seg-Video")){

        }

        $("#resultBoard").append(content);

        var newSegment = $("#resultBoard").children(":last");
        newSegment.addClass("MintShow");
        if(i%2)
            newSegment.css("background-color", "#e4e4e4");
        else
            newSegment.css("background-color", "#fff");

    }
}

$(window).resize(function(){
    $("#dl-menu").css("left", $("#add").offset().left);
});