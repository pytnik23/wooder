$(function() {
	var documentEl = $(document),
		mobileMenu = $('.mobile-menu');
	
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
	var bg 		= $('.mobile-menu-bg-wrap'),
		menuBg 	= $('.mobile-menu-block');

	mobileMenu.on('click', function(e) {
		e.preventDefault();
		bg.css('display', 'block');
		menuBg.css('left', '0');
		$('html, body').css({
			'overflow': 'hidden',
			'height': '100%'
		});
	});
	bg.on('click', function(a) {
		bg.css('display', '');
		menuBg.css('left', '');
		$('html, body').css({
			'overflow': '',
			'height': ''
		});
	});
	// menuBg.on('click', function(a) {
	// 	if (e.target.tagName !== 'A') return;
	// 	bg.css('display', '');
	// 	menuBg.css('left', '');
	// 	$('html, body').css({
	// 		'overflow': '',
	// 		'height': ''
	// 	});
	// });
});