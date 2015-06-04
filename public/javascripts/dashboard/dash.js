$(document).ready(function() {

    reSizeMenuItem();

    $(".ListItem").click(function(){
        $(".ListItem").removeClass("SelectedItem");
        $(this).addClass("SelectedItem");
    });

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

});

$(window).resize(function(){
    reSizeMenuItem();
});

function reSizeMenuItem(){
    if($("#userMenu").width()<150){
        $(".ListItem").css("font-size", "1em");
    }else {
        $(".ListItem").css("font-size", "1.8em");
    }
}
