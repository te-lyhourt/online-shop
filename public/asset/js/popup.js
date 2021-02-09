$(function(){
    $(".open-button").click(function () { 
        $("#popUp").addClass("active")
        $("#overlay").addClass("active")
    })
    
    $(".close-button").click(function(){
    
        $("#popUp").removeClass("active")
        $("#overlay").removeClass("active")
    })
})
