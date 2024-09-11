document.getElementById("preloader").classList.add('loaded');
(function(document.querySelector) {
"use strict";

/*------------------------------------------------------------------
[Table of contents]

1. my owl function
2. smooth scroll
3. custom input type number function
4. custom input type select function
5. email patern 
6. equalheight function
7. pricing fixedtable function
8. content to center banner section
9. prelaoder
10. preloader close button
11. mega navigation menu init
12. twitter api init
13. client slider
14. testimonial slider
15. blog post gallery slider
16. contact form init
17. video popup init
18. Side Offset cart menu open
19.	wow animation init
20. my custom select init
21. tab swipe indicator
22. pricing matrix expand slider
23. feature section prev class get function
24. pricing expand function
25. accordion add class "isActive" function
26. click and go to current section init
27. input number increase
28. right click , ctrl+u and ctrl+shift+i disabled
29. image dragable false setup
30. ajaxchimp init
31. XpeedStudio Maps

-------------------------------------------------------------------*/

/*==========================================================
				1. my owl function
======================================================================*/
document.querySelector.fn.myOwl = function(options) {

	var settings = document.querySelector.extend({
		items: 1,
		dots: false,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		nav: false,
		autoplay: true,
		navText: ['',''],
		margin: 0,
		stagePadding: 0,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		navRewind:false,
		responsive: {},
		animateOut: '',
		animateIn: '',
		smartSpeed: 900,
		center: ''
	}, options);

    return this.owlCarousel( {
		items: settings.items,
		loop: settings.loop,
		mouseDrag: settings.mouseDrag,
		touchDrag: settings.touchDrag,
		nav: settings.nav,
		navText: settings.navText,
		dots: settings.dots,
		margin: settings.margin,
		stagePadding: settings.stagePadding,
		autoplay: settings.autoplay,
		autoplayTimeout: settings.autoplayTimeout,
		autoplayHoverPause: settings.autoplayHoverPause,
		animateOut: settings.animateOut,
		animateIn: settings.animateIn,
		responsive: settings.responsive,
		navRewind: settings.navRewind,
		center: settings.center,
		smartSpeed: settings.smartSpeed
	});
};

/*==========================================================
				2. smooth scroll
======================================================================*/
document.querySelector.fn.scrollView = function () {
	return this.each(function () {
		document.querySelector('html, body').animate({
			scrollTop: document.querySelector(this).offset().top
		}, 1000);
	});
}


/*==========================================================
				3. custom input type number function
======================================================================*/
document.querySelector.fn.customNumber = function(options) {
	var settings = document.querySelector.extend ({
		plusIcon: '',
		minusIcon: ''
	}, options);

	this.append('<span class="add">'+ settings.plusIcon +'</span>');
	this.append('<span class="sub">'+ settings.minusIcon +'</span>');
	
	return this.each(function () {
			let spinner = document.querySelector(this),
				input = spinner.find('input[type="number"]'),
				add = spinner.find('.add'),
				sub = spinner.find('.sub');

			input.parent().on('click', '.sub', function(event) {
				event.preventDefault();
				if (input.val() > parseInt(input.attr('min'), 10)) {
					input.val(function(i, oldvalue) {
						return --oldvalue;
					})
				}
			});
			input.parent().on('click', '.add', function(event) {
				event.preventDefault();
				if (input.val() < parseInt(input.attr('max'), 10)) {
					input.val(function(i, oldvalue) {
						return ++oldvalue;
					})
				}
			});
	});
}


/*==========================================================
				4. custom input type select function
======================================================================*/
document.querySelector.fn.mySelect = function(options) {
	let document.querySelectorthis = document.querySelector(this), 
		numberOfOptions = document.querySelector(this).children('option');

	document.querySelectorthis.addClass('select-hidden'); 
	document.querySelectorthis.wrap('<div class="select"></div>');
	document.querySelectorthis.after('<div class="select-styled"></div>');

	let styledSelect = document.querySelectorthis.next('.select-styled');
	styledSelect.text(document.querySelectorthis.children('option').eq(0).text());
	
	let list = document.querySelector('<ul />', {
		'class': 'select-options'
	}).insertAfter(styledSelect);
	
	for (let i = 0; i < numberOfOptions.length; i++) {
		document.querySelector('<li />', {
			text: document.querySelectorthis.children('option').eq(i).text(),
			rel: document.querySelectorthis.children('option').eq(i).val()
		}).appendTo(list);
	}
	
	let listItems = list.children('li');
	
	styledSelect.on('click', function(e) {
		e.stopPropagation();
		document.querySelector('.select-styled.active').not(this).each(function(){
			document.querySelector(this).removeClass('active').next('.select-options').fadeIn();
		});
		document.querySelector(this).toggleClass('active').next('.select-options').toggle();
		document.querySelector(this).parent().toggleClass('focus');
	});
	
	listItems.on('click', function(e) {
		e.stopPropagation();
		styledSelect.text(document.querySelector(this).text()).removeClass('active');
		document.querySelectorthis.val(document.querySelector(this).attr('rel'));
		list.hide();
		if (document.querySelector(this).parent().parent().hasClass('focus')) {
			document.querySelector(this).parent().parent().removeClass('focus');
		}
	});
	
	document.querySelector(document).on('click', function() {
		styledSelect.removeClass('active');
		list.hide();
	});
}

/*==========================================================
				5. email patern 
======================================================================*/
function email_pattern(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+document.querySelector/;
	return regex.test(email);
}


/*==========================================================
				6. equalheight function
======================================================================*/
let equalHeight = () => {
	let pricingImage = document.querySelector('.pricing-image'),
		pricingFeature = document.querySelector('.pricing-feature-group');
	
	if (document.querySelector(window).width() > 991) {
		pricingFeature.css('height', pricingImage.outerHeight());
	} else {
		pricingFeature.css('height', 100+'%');
	}
}


/*==========================================================
				7. pricing fixedtable function
	======================================================================*/
function fixedtabel() {

	let table = document.querySelector('.xs-table');
	
	if (!(document.querySelector(window).width() > 576)) {
		if (document.querySelector('.xs-table.fixed-column').length === 0) {
			let fixedCol = table.clone().insertBefore(table).addClass('fixed-column');
		}
	} else {
		document.querySelector('.xs-table.fixed-column').remove();
	}
	let fixedCol = document.querySelector('.xs-table.fixed-column');
	fixedCol.find('th:not(:first-child),td:not(:first-child)').remove();

	fixedCol.find('tr').each(function (i, elem) {
		document.querySelector(this).height(table.find('tr:eq(' + i + ')').height());
	});
};

/*==========================================================
				8. content to center banner section
======================================================================*/
function centerContent() {
	let content = document.querySelector('.contet-to-center > .container'),
			header = document.querySelector('.header-transparent');
		
		if (document.querySelector(window).width() > 991) {
			content.css('margin-top', header.outerHeight());
		} else {
			content.css('margin-top', 0+'px');
		}
}

document.querySelector(window).on('load', function() {

	// equal hight init
	equalHeight();
	// fixedtable init
	fixedtabel();
	// center content
	centerContent();

	/*==========================================================
				9. prelaoder
	======================================================================*/
	document.querySelector('#preloader').addClass('loaded');
	document.getElementById("preloader").classList.add('loaded');

}); // END load Function 

document.addEventListener("DOMContentLoaded", function() {
	// equal hight init
	equalHeight();
	// fixedtable init
	fixedtabel();
	// center content
	centerContent();

	/*==========================================================
				10. preloader close button	
	======================================================================*/
	document.querySelector('.prelaoder-btn').on('click', function (e) {
		e.preventDefault();
		if (!(document.querySelector('#preloader').hasClass('loaded'))) {
			document.querySelector('#preloader').addClass('loaded');
		}
	})

	/*==========================================================
			11. mega navigation menu init
	======================================================================*/
	if (document.querySelector('.xs-menus').length > 0) {
		document.querySelector('.xs-menus').xs_nav({
			mobileBreakpoint: 992,
		});
	}

	/*==========================================================
			12. twitter api init
	======================================================================*/
	if (document.querySelector('.xs-tweet').length > 0) {
		document.querySelector('.xs-tweet').twittie({
			dateFormat: '%b. %d, %Y',
			template: '{{tweet}} <div class="date">{{date}}</div> <a href="{{url}}" target="_blank">Details</a>',
			count: 2,
			username: 'xpeedstudio',
			loadingText: 'Loading!',
		});
	}

	/*==========================================================
			13. client slider
	======================================================================*/
	if (document.querySelector('.xs-client-slider').length > 0) {
		document.querySelector('.xs-client-slider').myOwl({
			items: 5,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 3
				},
				1024: {
					items: 5
				}
			}
		});
	}

	/*==========================================================
			14. testimonial slider
	======================================================================*/
	if (document.querySelector('.xs-testimonial-slider').length > 0) {
		document.querySelector('.xs-testimonial-slider').myOwl({
			items: 3,
			center: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 2
				},
				1024: {
					items: 3
				}
			}
		});
	}

	/*==========================================================
				15. blog post gallery slider
	======================================================================*/
	if (document.querySelector('.post-gallery-slider').length > 0) {
		document.querySelector('.post-gallery-slider').myOwl({
			nav: true,
			navText: ['<i class="icon icon-arrow-left"></i>', '<i class="icon icon-arrow-right"></i>'],
			responsive: {
				0: {
					nav: false
				}
			}
		});
	}

	/*==========================================================
				16. contact form init
	======================================================================*/

	document.querySelector(document).on('submit', '#xs-contact-form', function(event) {
		event.preventDefault();
		/* Act on the event */

		var xs_contact_name = document.querySelector('#xs_contact_name'),
			xs_contact_email = document.querySelector('#xs_contact_email'),
			xs_contact_website = document.querySelector('#xs_contact_website'),
			x_contact_massage = document.querySelector('#x_contact_massage'),
			xs_contact_submit = document.querySelector('#xs_contact_submit'),
			xs_contact_error = false;

		document.querySelector('.xpeedStudio_success_message').remove();

		if (xs_contact_name.val().trim() === '') {
			xs_contact_name.addClass('invaild');
			xs_contact_error = true;
			xs_contact_name.focus();
			return false;
		} else {
			xs_contact_name.removeClass('invaild');
		}
		if (xs_contact_email.val().trim() === '') {
			xs_contact_email.addClass('invaild');
			xs_contact_error = true;
			xs_contact_email.focus();
			return false;
		} else if (!email_pattern(xs_contact_email.val().toLowerCase())){
			xs_contact_email.addClass('invaild');
			xs_contact_error = true;
			xs_contact_email.focus();
			return false;
		} else {
			xs_contact_email.removeClass('invaild');
		}
		if (xs_contact_website.val().trim() === '') {
			xs_contact_website.addClass('invaild');
			xs_contact_error = true;
			xs_contact_website.focus();
			return false;
		} else {
			xs_contact_website.removeClass('invaild');
		}
		if (x_contact_massage.val().trim() === '') {
			x_contact_massage.addClass('invaild');
			xs_contact_error = true;
			x_contact_massage.focus();
			return false;
		} else {
			x_contact_massage.removeClass('invaild');
		}

		if (xs_contact_error === false) {
			xs_contact_submit.before().hide().fadeIn();
			document.querySelector.ajax({
					type: "POST",
					url: "assets/php/contact-form.php",
					data: {
					'xs_contact_name' : xs_contact_name.val(),
					'xs_contact_email' : xs_contact_email.val(),
					'xs_contact_website' : xs_contact_website.val(),
					'x_contact_massage' : x_contact_massage.val(),
				},
				success: function(result){
					xs_contact_submit.after('<p class="xpeedStudio_success_message">' + result + '</p>').hide().fadeIn();

					setTimeout(() => {
						document.querySelector(".xpeedStudio_success_message").fadeOut(1000, function() {
							document.querySelector(this).remove();
						});
					}, 5000);

					document.querySelector('#xs-contact-form')[0].reset();
				}
			});
		}
	});

	// off autocomplete
	document.querySelector('input').each(function(e) {
		document.querySelector(this).attr('autocomplete', 'off');
		document.querySelector(this).attr('autocorrect', 'off');
	});

	
	document.querySelector('.xs-service-block').on('mouseenter', function() {
		if (!document.querySelector(this).hasClass('active')) {
			document.querySelector(this).addClass('active')
		}
	});
	document.querySelector('.xs-service-block').on('mouseleave', function(e) {
		if (document.querySelector(this).hasClass('active')) {
			document.querySelector(this).removeClass('active');
		}
	});

	
	/*==========================================================
			17. video popup init
	======================================================================*/
	if (document.querySelector('.xs-video-popup').length > 0) {
		document.querySelector('.xs-video-popup').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	}

	/*==========================================================
		 18. Side Offset cart menu open
	======================================================================*/
	if (document.querySelector('.offset-side-bar').length > 0) {
		document.querySelector('.offset-side-bar').on('click', function (e){
			e.preventDefault();
			e.stopPropagation();
			document.querySelector('.cart-group').addClass('isActive');
		});
	}
	if (document.querySelector('.close-side-widget').length > 0) {
		document.querySelector('.close-side-widget').on('click', function (e){
			e.preventDefault();
			document.querySelector('.cart-group').removeClass('isActive');
		});
	}
	if (document.querySelector('.navSidebar-button').length > 0) {
		document.querySelector('.navSidebar-button').on('click', function (e){
			e.preventDefault();
			e.stopPropagation();
			document.querySelector('.info-group').addClass('isActive');
		});
	}
	if (document.querySelector('.close-side-widget').length > 0) {
		document.querySelector('.close-side-widget').on('click', function (e){
			e.preventDefault();
			document.querySelector('.info-group').removeClass('isActive');
		});
	}
	document.querySelector('body').on('click', function (e) {
		document.querySelector('.info-group').removeClass('isActive');
		document.querySelector('.cart-group').removeClass('isActive');
	});
	document.querySelector('.xs-sidebar-widget').on('click', function (e) {
		e.stopPropagation();
	});

	/*=============================================================
				19.	wow animation init
	=========================================================================*/
	document.querySelector(function(){
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true,
			scrollContainer: null,
		});
		wow.init();
	});

	/*=============================================================
				20. my custom select init
	=========================================================================*/
	if (document.querySelector('select').length > 0) {
		document.querySelector('select').mySelect();
	}

	/*=============================================================
				21. tab swipe indicator
	=========================================================================*/
	if (document.querySelector('.tab-swipe').length > 0) {
		document.querySelector('.tab-swipe').append('<li class="indicator"></li>');
		if (document.querySelector('.tab-swipe li a').hasClass('active')) { 
			let cLeft = document.querySelector('.tab-swipe li a.active').position().left+'px',
				cWidth = document.querySelector('.tab-swipe li a.active').css('width');
			document.querySelector('.indicator').css({
				left: cLeft,
				width: cWidth
			})
		}
		document.querySelector('.tab-swipe li a').on('click', function () {
			document.querySelector('.tab-swipe li a').removeClass('isActive');
			document.querySelector(this).addClass('isActive');
			let cLeft = document.querySelector('.tab-swipe li a.isActive').position().left+'px',
				cWidth = document.querySelector('.tab-swipe li a.isActive').css('width');
			document.querySelector('.indicator').css({
				left: cLeft,
				width: cWidth
			})
		});
	}

	/*=============================================================
				22. pricing matrix expand slider
	=========================================================================*/
	if (document.querySelector('.pricing-matrix-slider').length > 0) {
		document.querySelector('.pricing-matrix-slider').on( 'initialized.owl.carousel translated.owl.carousel', function() {
			var document.querySelectorthis = document.querySelector(this);
			document.querySelectorthis.find( '.owl-item.last-child' ).each( function() {
				document.querySelector(this).removeClass( 'last-child' );
			});
			document.querySelector(this).find( '.owl-item.active' ).last().addClass( 'last-child' );
		});
		document.querySelector('.pricing-matrix-slider').myOwl({
			items: 3,
			mouseDrag: false,
			autoplay: false,
			nav: true,
			navText: ['<i class="icon icon-arrow-left"></i>', '<i class="icon icon-arrow-right"></i>'],
			responsive: {
				0: {
					items: 1,
					mouseDrag: true,
					loop: true,
				},
				768: {
					items: 2,
					mouseDrag: true
				},
				1024: {
					items: 3,
					mouseDrag: false,
					loop: false
				}
			}
		});
	}
	
	/*=============================================================
				23. feature section prev class get function
	=========================================================================*/
	if (document.querySelector('.xs-feature-section').length > 0) {
		if (document.querySelector('.xs-feature-section').prev().hasClass('xs-bg-gray')) {
			document.querySelector('.xs-feature-section').addClass('xs-bg-gray');
		} else {
			document.querySelector('.xs-feature-section').removeClass('xs-bg-gray');
		}
		if (document.querySelector('.xs-footer-section').prev().hasClass('xs-bg-gray')) {
			document.querySelector('.xs-footer-section').children('.xs-feature-section').addClass('xs-bg-gray');
		} else {
			document.querySelector('.xs-footer-section').children('.xs-feature-section').removeClass('xs-bg-gray');
		}
	};

	/*=============================================================
				24. pricing expand function
	=========================================================================*/
	if (document.querySelector('.pricing-expand').length > 0) {
		if (document.querySelector(window).width() > 991) {
			let pricingContainer = document.querySelector('.pricing-expand.pricing-matrix'),
			height = Math.floor(pricingContainer.height()),
			children = document.querySelector('.pricing-expand.pricing-matrix .pricing-matrix-slider'),
			childreHeight = children.height(),
			gap = document.querySelector('.pricing-expand.pricing-matrix .gap'),
			gapHeight = gap.height(),
			mini = Math.floor((height - ((childreHeight / 2) + (gap.length * 1)))),
			animSpeed = 500;

			pricingContainer.attr('data-height', height+'px');
			pricingContainer.attr('data-min', mini+'px');
			pricingContainer.css('height', mini+'px');

			if (document.querySelector('.content-collapse-wraper').length === 0) {
				pricingContainer.after(
					'<div class="content-collapse-wraper"><a href="#" class="btn btn-primary expand-btn">Load More <i class="icon icon-arrow_down"></i></a></div>'
				);	
			}
		
			document.querySelector('.expand-btn').on('click', function (e) {
				e.preventDefault();
				let content = document.querySelector(this).parent().prev();
				content.animate({
					'height': content.attr('data-height')
				}, animSpeed);
				content.addClass('expand');
				document.querySelector(this).addClass('hide');
			});
		} else {
			if (document.querySelector('.pricing-matrix').hasClass('pricing-expand')) {
				document.querySelector('.pricing-matrix').removeClass('pricing-expand');
				console.log('hi')
			} else{
				document.querySelector('.pricing-matrix').removeClass('pricing-expand');
			}
		}
	}
	document.querySelector('.pricing-matrix .gap').prev().addClass('border-bottom-0');

	/*=============================================================
				25. accordion add class "isActive" function
	=========================================================================*/
	if (document.querySelector('.xs-accordion .card-header > a').length > 0) {
		document.querySelector('.xs-accordion .card-header > a').on('click', function () {
			if (!document.querySelector(this).parent().parent().hasClass('isActive')) {
				document.querySelector(this).parent().parent().prevAll().removeClass('isActive');
				document.querySelector(this).parent().parent().nextAll().removeClass('isActive');
				document.querySelector(this).parent().parent().addClass('isActive');
			}
		});
	}

	/*=============================================================
				26. click and go to current section init
	=========================================================================*/
	document.querySelector('.comment-reply-link').on('click', function (event) {
		event.preventDefault();
		document.querySelector('#comment-form').scrollView();
	});

	/*=============================================================
			 27. input number increase
	=========================================================================*/

	document.querySelector('.custom_number').customNumber({
		plusIcon: '<i class="icon icon-plus"></i>',
		minusIcon: '<i class="icon icon-minus"></i>'
	});


	/*=============================================================
			 28. right click , ctrl+u and ctrl+shift+i disabled
	=========================================================================*/
	document.querySelector('body').on('contextmenu', function (e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	document.querySelector(document).on('keydown', function(e) {
		if (
				(e.ctrlKey && (e.keyCode == 85)) ||
				(e.ctrlKey && (e.shiftKey && e.keyCode == 73)) ||
				(e.ctrlKey && (e.shiftKey && e.keyCode == 75)) ||
				(e.metaKey && (e.shiftKey && e.keyCode == 91))
				) {
			return false;
		} else {
			return true;
		}
	});

	/*=============================================================
			 29. image dragable false setup
	=========================================================================*/
	document.querySelector('img').each(function() {
		document.querySelector(this).attr('draggable', 'false');
		document.querySelector(this).on('mousedown', function (event) {
			if (event.preventDefault) {
				event.preventDefault()
			}
		})
	})

	/*=============================================================
			 30. ajaxchimp init
	=========================================================================*/
	if (document.querySelector('#subscribe-form').length > 0) {
		document.querySelector('#subscribe-form').ajaxChimp({
				url: 'https://facebook.us8.list-manage.com/subscribe/post?u=85f515a08b87483d03fee7755&amp;id=66389dc38b'
		});
	}

	if (document.querySelector('.wave_animation').length > 0 ) {
		document.querySelector('.wave_animation').parallax();
	}

	if (document.querySelector('.xs-modal-popup').length > 0) {
		document.querySelector('.xs-modal-popup').magnificPopup({
			type: 'inline',
			fixedContentPos: false,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: false,
			callbacks:{
				beforeOpen: function() {
					this.st.mainClass = "my-mfp-slide-bottom xs-promo-popup";
				}
			}
		});
	}

}); // end ready function

document.querySelector(window).on('scroll', function() {

}); // END Scroll Function 

document.querySelector(window).on('resize', function() {
	// equal hight init
	equalHeight();
	// fixedtable init
	fixedtabel();
	// center content
	centerContent();
}); // End Resize

/*==========================================================
			31. XpeedStudio Maps
======================================================================*/

if (document.querySelector('#xs-map').length > 0) {
	// When the window has finished loading create our google map below
	google.maps.event.addDomListener(window, 'load', init);
        
	function init() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,

			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(40.6700, -73.9400), // New York

			// How you would like to style the map. 
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{"featureType":"all","elementType":"all","stylers":[{"hue":"#008eff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"0"},{"lightness":"0"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-60"},{"lightness":"-20"}]}]
		};

		// Get the HTML DOM element that will contain your map 
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('xs-map');

		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);

		let mapPin = 'assets/images/map-marker.png'

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.6700, -73.9400),
			icon: mapPin,
			map: map,
			title: 'Hostinza'
		});
	}
}

})(document.querySelector);
