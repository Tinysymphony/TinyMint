var target;

$(document).ready(function() {

    reSizeMenuItem();

    $("#logout").click(function(){
        var sendSignal = {exitSignal:true};
        $.ajax({
            data: sendSignal,
            type: "POST",
            url: "/dashboard/logout",
            dataType: 'text',
            cache: false,
            timeout: 5000,
            success: function(data) {
                var getData = $.parseJSON(data);
                if(getData.info) {
                    window.location = '/';
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                var info = 'error ' + textStatus + " " + errorThrown;
                alert(info);
            }
        });
    });

    $(".ListItem").click(function(){
        $(".ListItem").removeClass("SelectedItem");
        $(this).addClass("SelectedItem");
    });

    $("#mints").click(function(){
        $("#userInfoBoard").css("display", "none");
        $("#userMintBoard").css("display", "block");
    });

    $("#accountInfo").click(function(){
        $("#userMintBoard").css("display", "none");
        $("#userInfoBoard").css("display", "block");
    });

    $("#create").click(function(){
        var title = $("#titleInput").val();
        if(!title){
            $("#modal-text").text("Please Input A Name");
            $("#notice").modal({
                show: true,
                backdrop: true
            });
        }else{
            var data = {
                title: title
            }
            $.ajax({
                data: data,
                type: "POST",
                url: "/dashboard/create",
                async: false,
                dataType: 'text',
                cache: false,
                timeout: 5000,
                success: function(data) {
                    var getData = $.parseJSON(data);
                    if (getData.fail) {
                        $("#modal-text").text(getData.fail);
                        $("#notice").modal({
                            show: true,
                            backdrop: true
                        });
                    } else {
                        var newMint = "<div id='" + title +"' class='product DesignWork'>" +
                            "<div class='product__info'> <img class='product__image' src='/images/mint-default.png' alt='TinyMint' /> " +
                            "<h3 class='product__title'>" + title + "</h3> " +
                            "<button class='action action--button action--buy WorkButton EditMint'><span class='action__text'>Edit</span></button> " +
                            "<button class='action action--button action--buy WorkButton DownloadMint'><span class='action__text'>Download</span></button> " +
                            "<button class='action action--button action--buy WorkButton ShareMint'><span class='action__text'>Share</span></button> " +
                            "<button class='action action--button action--buy WorkButton DeleteMint'><span class='action__text'>Delete</span></button> " +
                            "</div> " +
                            "</div>"
                        $("#mintList").prepend(newMint);
                        boundButton();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var info = textStatus + " " + errorThrown;
                    $("#modal-text").text(info);
                    $("#notice").modal({
                        show: true,
                        backdrop: true
                    });
                }
            });
        }
    });

    $("#submitInfo").click(function(){
        var accountInfo = {
            nickname: $().val(),
            mobilePhone: $().val(),
            email: $().val(),
            blog: $().val(),
            gender: $().val,
            age: $().val,
            interestTags: $().val()
        };
        $.ajax({
            data: accountInfo,
            type: "POST",
            url: "/dashboard/infos",
            async: false,
            dataType: 'text',
            cache: false,
            timeout: 5000,
            success: function(data){
                var getData = $.parseJSON(data);
                //$("#")
            },
            error: function(jqXHR, textStatus, errorThrown){
                var info = 'error ' + textStatus + " " + errorThrown;
                alert(info);
            }
        });
    });

    boundButton();

    $("#continue").click(function(){
        $("#warning").modal('hide');
        var title = {
            title: target
        };
        $.ajax({
            data: title,
            type: "POST",
            url: "/dashboard/delete",
            async: false,
            dataType: 'text',
            cache: false,
            timeout: 5000,
            success: function(){
                $("#" + target).remove();
            },
            error: function(jqXHR, textStatus, errorThrown){
                var info = textStatus + " " + errorThrown;
                $("#modal-text").text(info);
                $("#notice").modal({
                    show: true,
                    backdrop: true
                });
            }
        });
    });
});

$(window).resize(function(){
    reSizeMenuItem();
});

function boundButton() {

    $(".EditMint").click(function(){
        var title = $(this).parent().parent().attr("id");
        window.location = "/editor?title=" + title;
    });

    $(".DeleteMint").click(function(){
        var title = $(this).parent().parent().attr("id");
        target =title;
        $("#warning-content").text("Are you sure to delete " + title + " ?");
        $("#warning").modal({
            show: true,
            backdrop: true
        });
    });

    $(".DownloadMint").click(function(){
        var name = $(this).parent().parent().attr("id");
        var form=$("<form>");
        form.attr("style","display:none");
        form.attr("target","");
        form.attr("method","post");
        form.attr("action","/editor/download");
        var inputTitle=$("<input>");
        inputTitle.attr("type","hidden");
        inputTitle.attr("name","title");
        inputTitle.attr("value",name);
        $("body").append(form);
        form.append(inputTitle);
        form.submit();
    });
}

function reSizeMenuItem(){
    if($("#userMenu").width()<150){
        $(".ListItem").css("font-size", "1em");
    }else {
        $(".ListItem").css("font-size", "1.8em");
    }
}
