$(function(){

    $( "#mMenu" ).click( function() {
        $( "#mMenu" ).toggleClass( "menu-open" );
        $( ".menu-block__wrapper" ).toggleClass( "menu-show" )
    })
    $( ".section__container" ).bind( "mouseenter mouseleave", function() {
        //$( this ).toggleClass("entered");
        console.info("Catch it!")
    });
})(jQuery);
