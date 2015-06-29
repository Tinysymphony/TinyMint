
var segCount = 1;

$(document).ready(function(){

    var mintName = $("#titleText").text();
    var sendData = {"filename": mintName};
    var ajaxUrl;
    var editorType = $("#flag").text();
    if(editorType=="readonly"){
        ajaxUrl = "/editor/readonlyInit"
    }else{
        ajaxUrl = "/editor/init";
    }
    $.ajax({
        data: sendData,
        type: "POST",
        url: ajaxUrl,
        cache: false,
        async: false,
        dataType: "text",
        timeout: 5000,
        success: function(data){
            var getData = $.parseJSON(data);
            //document.getElementById('resultBoard').innerHTML = getData.html;
            $("#resultBoard").html(getData.html);
            $("#segmentHolder").html(getData.segments);
            if(getData.values){
                var values = $("#segmentBoard").find(".store");
                for(var i=0; i<values.length; i++){
                    values.eq(i).val((getData.values)[i]);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            $("#modal-text").text("This mint is empty.");
            $("#notice").modal({
                show: true,
                backdrop: true
            });
        }
    });

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
        appendSegment($("#h-headline").html());
    });

    $("#paragraph").click(function(){
        appendSegment($("#h-paragraph").html());
    });

    $("#article").click(function(){
        appendSegment($("#h-article").html());
    });

    $("#markdown").click(function(){
        appendSegment($("#h-markdown").html());
    });

    $("#gallery").click(function(){
        appendSegment($("#h-gallery").html());
    });

    $("#circles").click(function(){
        appendSegment($("#h-circles").html());
    });

    $("#single").click(function(){
        appendSegment($("#h-single").html());
    });

    $("#music").click(function(){
        if($(".Seg-Music").length >= 2){
            $("#modal-text").text("Music Module is unique.");
            $("#notice").modal({
                show: true,
                backdrop: true
            });
            return;
        }
        appendSegment($("#h-music").html());
    });

    $("#video").click(function(){
        appendSegment($("#h-video").html());
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

    $("#cloudSave").click(function(){
        if(editorType != "readonly"){
            savePage();
        } else {
            $("#modal-text").text("Cannot Save Readonly Mint");
            $("#notice").modal({
                show: true,
                backdrop: true
            });
        }
    });


    $("#download").click(function() {
        if(editorType != "readonly")
        {
            savePage();
            downloadArchive(editorType);
        } else {
            $("#modal-text").text("ReadOnly Mode Cannot Get Saved Mint");
            $("#notice").modal({
                show: true,
                backdrop: true
            });
            downloadArchive(editorType);
        }
    });

    $("#dl-menu").css("left", $("#add").offset().left);

    setSelect();

    $("#refresh").click(function(){
        loadMint();
    });

    $("#TinyMint").click(function(){
        if(editorType!="readonly"){
            $("#warning-content").text("Do you prefer to save current work before return to dashboard?");
            $("#warning").modal({
                show: true,
                backdrop: true
            });
        }else{
            window.location="/";
        }

    });

    $("#yes").click(function () {
        savePage();
        window.location="/";
    });

    $("#nope").click(function () {
        window.location="/";
    });

    $(".about").click(function(){
        $("#modal-text").text("TinyMint Ver 1.2 ——WyTiny");
        $("#notice").modal({
            show: true,
            backdrop: true
        });
    });

    $(".contact").click(function(){
        $("#modal-text").text("zjutiny@gmail.com / QQ:450803481");
        $("#notice").modal({
            show: true,
            backdrop: true
        });
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
        $(this).css({"border":"8px solid #EEC900"});
        $(".Segment").not(this).removeClass("Selected").css({"border": "none"});
    });
}

function loadMint(){

    $("#resultBoard").empty();

    var size = $("#segmentHolder").children(".Segment").length;

    for(var i=0; i<size; i++){

        var segment = $("#segmentHolder").children().eq(i);

        var appendSection = "<section class='paint-area'></section>";
        $("#resultBoard").append(appendSection);

        var newSegment = $("#resultBoard").children(":last");
        newSegment.addClass("MintShow");

        if(segment.hasClass("DefaultTitle")){

            var title = segment.find("#titleText").text();
            var segData = {"title": title};
            newSegment.load("/editor/modules #header", segData);

        }else if(segment.hasClass("Seg-Headline")){

            var mainTitle = segment.find("#headline-main-title").val();
            var subTitle = segment.find("#headline-subtitle").val();
            var segData = {"mainTitle": mainTitle, "subTitle": subTitle};
            newSegment.load("/editor/modules #headline", segData);

        }else if(segment.hasClass("Seg-Paragraph")){

            var paraContent= segment.find("#paragraph-content").val();
            var segData = {"paraContent": paraContent};
            newSegment.load("/editor/modules #paragraph", segData);

        }else if(segment.hasClass("Seg-Article")){

            var articleContent = segment.find("#article-content").val();
            var articleTitle = segment.find("#article-title").val();
            var segData = {"articleContent": articleContent, "articleTitle": articleTitle};
            newSegment.load("/editor/modules #article", segData);

        }else if(segment.hasClass("Seg-Markdown")){

            var markdown = segment.find("#markdown-content").val();
            var segData = {"markdown": markdown};
            newSegment.load("/editor/markdown", segData);

        }else if(segment.hasClass("Seg-Single")){

            var link = segment.find("#single-link").val();
            var content = segment.find("#single-content").val();
            var segData = {"singleLink": link, "singleContent": content};

            var type = segment.find("#singleType").children(".active").attr("id");
            if(type=="s-bottom")
                newSegment.load("/editor/modules #single-bottom", segData);
            else if(type=="s-top")
                newSegment.load("/editor/modules #single-top", segData);
            else if(type=="s-left")
                newSegment.load("/editor/modules #single-left", segData);
            else if(type=="s-right")
                newSegment.load("/editor/modules #single-right", segData);

        }else if(segment.hasClass("Seg-Circles")){

            var cLink1 = segment.find("#circle-link1").val();
            var cLink2 = segment.find("#circle-link2").val();
            var cLink3 = segment.find("#circle-link3").val();
            var cTitle1 = segment.find("#circle-title1").val();
            var cTitle2 = segment.find("#circle-title2").val();
            var cTitle3 = segment.find("#circle-title3").val();
            var cContent1 = segment.find("#circle-content1").val();
            var cContent2 = segment.find("#circle-content2").val();
            var cContent3 = segment.find("#circle-content3").val();
            var segData = {
                "circleLink1": cLink1,
                "circleLink2": cLink2,
                "circleLink3": cLink3,
                "circleTitle1": cTitle1,
                "circleTitle2": cTitle2,
                "circleTitle3": cTitle3,
                "circleContent1": cContent1,
                "circleContent2": cContent2,
                "circleContent3": cContent3
            };
            newSegment.load("/editor/modules #circles", segData);


        }else if(segment.hasClass("Seg-Gallery")){

            var link1 =  segment.find("#gallery-link1").val();
            var link2 =  segment.find("#gallery-link2").val();
            var link3 =  segment.find("#gallery-link3").val();
            var segData = {"galleryLink1": link1, "galleryLink2": link2, "galleryLink3": link3};
            newSegment.load("/editor/modules #carousel-example-generic", segData); //TODO change the plugin

        }else if(segment.hasClass("Seg-Music")){

            var musicLink = segment.find("#music-link").val();
            var segData= {"musicLink": musicLink};
            newSegment.load("/editor/modules #music", segData);

        }else if(segment.hasClass("Seg-Video")){

            var videoLinkInput =  segment.find("#video-link").val().split(" ");
            var videoLink ="";
            var re = /src="*/g;
            for(var index in videoLinkInput){
                var element = videoLinkInput[index];
                if(re.test(element)){
                    videoLink = element.split('"')[1]; // split by "
                }
            }
            var segData = {"videoLink": videoLink};
            newSegment.load("/editor/modules #video", segData);

        }

        if(i%2 && !segment.hasClass("Seg-Article"))
            newSegment.css("background-color", "#e4e4e4");
        else
            newSegment.css("background-color", "#fff");

    }
}

$(window).resize(function(){
    $("#dl-menu").css("left", $("#add").offset().left);
});

function savePage(){
    var name = $("#titleText").text();
    var author = $("#author").val();
    var data = $("#resultBoard").html();
    var segments = $("#segmentHolder").html();
    var values = $("#segmentBoard").find(".store");
    var inputs = [];
    for(var i=0; i<values.length; i++){
        inputs.push((values).eq(i).val());
    }
    var webData = {
        filename: name,
        author: author,
        sections: data,
        segments: segments,
        inputs: inputs
    };
    $.ajax({
        data: webData,
        type: "POST",
        url: "/editor/save",
        cache: false,
        async: false,
        timeout: 5000,
        success: function(data){
            var getData = $.parseJSON(data);
            alert(getData.info);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(textStatus + errorThrown);
        }
    });
}

function downloadArchive(editorType){
    var name = $("#titleText").text();
    var form=$("<form>");
    form.attr("style","display:none");
    form.attr("target","");
    form.attr("method","post");
    form.attr("action","/editor/download");
    var inputTitle=$("<input>");
    inputTitle.attr("type","hidden");
    inputTitle.attr("name","title");
    inputTitle.attr("value",name);
    var inputType=$("<input>");
    inputType.attr("type","hidden");
    inputType.attr("name","type");
    inputType.attr("value",editorType);
    $("body").append(form);
    form.append(inputTitle);
    form.append(inputType);
    form.submit();
}