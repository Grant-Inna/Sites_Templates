$(function(){

    $( "#mMenu" ).click( function() {
        $( "#mMenu" ).toggleClass( "menu-open" );
        $( ".menu-block__wrapper" ).toggleClass( "menu-show" )
    })
    $( ".section__container" ).bind( "mouseenter mouseleave", function() {
        $( '.section__popUp-block', this ).toggleClass("show-popUp");
        
        setTimeout(
            $( '.section__popUp-block', this ).toggleClass("display-popUp"), 3000);
    
        //
        // console.info( 'Пиу!' )
    });
})(jQuery);
