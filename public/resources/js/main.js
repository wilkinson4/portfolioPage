$(document).ready(function() {
    //Sticky nav
    $('.js--section-bio').waypoint(function(direction) {
      if (direction === "down") {
          $('nav').addClass('sticky');
      }  else {
          $('nav').removeClass('sticky');
      }
    },  {
        offset: '60px'
    });
    
     /* Mobile Navigation */
    $('.js--nav-icon').click(function(){
       var nav = $('.js--main-nav');
       var icon = $('.js--nav-icon ion-icon');
       nav.slideToggle(200);
        if (icon.attr("name") === 'menu') {
            icon.attr("name", 'close');
        } else {
            icon.attr("name", 'menu');
        }
        
        
    });
    
    //Page animations
    $('.js--wp-1').waypoint(function(direction) {
        $('.js--wp-1').addClass('animated fadeInLeft');
    }, {
        offset: '60%'
    }); 
    $('.js--wp-2').waypoint(function(direction) {
        $('.js--wp-2').addClass('animated fadeInRight');
    }, {
        offset: '60%'
    });
    $('.js--wp-3').waypoint(function(direction) {
        $('.js--wp-3').addClass('animated bounce');
    }, {
        offset: '70%'
    });
    
    //Smooth scroll animation on nav button click
    $('.js--scroll-to-bio').click(function(){
        $('html, body').animate({scrollTop: $('.js--section-bio').offset().top}, 1000);
    });

    $('.js--scroll-to-skills').click(function(){
        $('html, body').animate({scrollTop: $('.js--section-skills').offset().top}, 1000);
    });
    
    $('.js--scroll-to-projects').click(function(){
        $('html, body').animate({scrollTop: $('.js--section-projects').offset().top}, 1000);
    });
    
    $('.js--scroll-to-contact').click(function(){
        $('html, body').animate({scrollTop: $('.js--section-contact').offset().top}, 1000);
    });
    
	$(".typed").typed({
		strings: ["Tech Enthusiast", "Web Designer", "Front-End Developer"],
		// Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
		stringsElement: null,
		// typing speed
		typeSpeed: 30,
		// time before typing starts
		startDelay: 1200,
		// backspacing speed
		backSpeed: 20,
		// time before backspacing
		backDelay: 500,
		// loop
		loop: true,
		// false = infinite
		loopCount: 5,
		// show cursor
		showCursor: false,
		// character for cursor
		cursorChar: "|",
		// attribute to type (null == text)
		attr: null,
		// either html or text
		contentType: 'html',
		// call when done callback function
		callback: function() {},
		// starting callback function before each string
		preStringTyped: function() {},
		//callback for every typed string
		onStringTyped: function() {},
		// callback for reset
		resetCallback: function() {}
    });
});