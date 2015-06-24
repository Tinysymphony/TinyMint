var count = 0;

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

    $("#AddIcon").click(function(){
        count ++;
        var newID = "mint" + count;
        var newMint = "<div id='" + newID +"' class='product DesignWork'>" +
            "<div class='product__info'> <img class='product__image' src='/images/mint-default.png' alt='TinyMint' /> " +
            "<h3 class='product__title'>Init Mint</h3> " +
            "<button class='action action--button action--buy WorkButton EditMint'><span class='action__text'>Edit</span></button> " +
            "<button class='action action--button action--buy WorkButton DownloadMint'><span class='action__text'>Download</span></button> " +
            "<button class='action action--button action--buy WorkButton ShareMint'><span class='action__text'>Share</span></button> " +
            "<button class='action action--button action--buy WorkButton DeleteMint'><span class='action__text'>Delete</span></button> " +
            "</div> " +
            "</div>"
        $("#AddButton").before(newMint);

        //needs database operations

        boundButton();

    });

    boundButton();

});

$(window).resize(function(){
    reSizeMenuItem();
});

function boundButton() {
    $(".DeleteMint").click(function(){
        $(this).parent().parent().remove();

        //needs database operations

    });

    $(".EditMint").click(function(){
        var editMint = $(this).parent().parent().attr("id");
        $.ajax({
            data: editMint,
            type: "POST",
            url: "/editor",
            async: false,
            dataType: "text",
            cache: false,
            timeout: 5000,
            success: function(data){
                var getData = $.parseJSON(data);
                if(getData.link) {
                    window.location = getData.link;
                }else{
                    alert("Error");
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                var info = 'error ' + textStatus + " " + errorThrown;
                alert(info);
            }
        });
    });
}

function reSizeMenuItem(){
    if($("#userMenu").width()<150){
        $(".ListItem").css("font-size", "1em");
    }else {
        $(".ListItem").css("font-size", "1.8em");
    }
}
