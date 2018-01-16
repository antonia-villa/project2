$(document).ready(function() {
    $('#loader').css("display","none")

    $('form').submit(function() 
    {
        $('#loader').css("display","inline-block")
    }) 
});