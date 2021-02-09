$(function(){
    $("#term").change(function(){
        var st = this.checked;
        if(st) $("#submit").prop("disabled",false)
        else $("#submit").prop("disabled",true)
    })
})