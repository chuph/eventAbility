$(document).ready(function(){
      // $('.carousel.carousel-slider').carousel({fullWidth: true});
    $('select').material_select();
    $('.datepicker').pickadate();

    $('.slickHolder').slick({
    	dots: true,
        infinite: true
      });

}); // END READY