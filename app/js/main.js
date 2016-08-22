$(function() {
	var documentEl = $(document),
		mobileMenuButton = $('.mobile-menu');
	
	documentEl.on('scroll', function() {	
		// Scroll to top Button
		var scrollToTopButton = $('.scrollToTop');
		if ( $(this).scrollTop() > window.innerHeight ) {
			scrollToTopButton.fadeIn();
			scrollToTopButton.css('display', 'inline-block');
		} else {
			scrollToTopButton.fadeOut();
		}
	});


	// Mobile Menu
	var bg 		= $('.modal-bg'),
		menuBg 	= $('.mobile-menu-block');

	// modal BG toggle
	var scrollTogleElements = $('html, body');
	function modalBgToggle() {
		if (bg.css('display') === 'none') {
			bg.fadeIn('fast');
			scrollTogleElements.css({
				'overflow': 'hidden',
				'height': '100%'
			});
		} else {
			bg.fadeOut('fast');
			scrollTogleElements.css({
				'overflow': '',
				'height': ''
			});
		}
	}

	// menu toggle
	function toggleMenu() {
		if (menuBg.css('display') === 'none') {
			menuBg.css('display', 'block');
			menuBg.animate({'left': '+=200px'}, 100);
		} else {
			menuBg.animate({'left': '-=200px'}, 100, function() {
				menuBg.css('display', 'none');
			});
		}
	}

	//to close modal-bg
	bg.on('click', function() {
		modalBgToggle();
		toggleMenu();
	});
	documentEl.on('keydown', function(e) {
		if (bg.css('display') === 'block' && e.keyCode === 27) {
			modalBgToggle();
			toggleMenu();
		}
	});

	mobileMenuButton.on('click', function(e) {
		e.preventDefault();
		modalBgToggle();
		toggleMenu();
	});
	menuBg.on('click', function(e) {
		if (e.target.tagName !== 'A') return;
		modalBgToggle();
		toggleMenu();
	});

	// slow move on click to anchors
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (menuBg.css('display') === 'block') {
			modalBgToggle();
			toggleMenu();
		}
    	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    		var target = $(this.hash);
    		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    		if (target.length) {
    			$('html, body').animate({
    				scrollTop: target.offset().top
    			}, 600);
    			return false;
    		}
    	}
    });
});