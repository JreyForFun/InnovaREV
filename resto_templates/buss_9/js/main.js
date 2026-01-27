/*
	Author       : Theme-Family
	Template Name: Al-Mubdi - Multipurpose Bootstrap Template
	Version      : 1.0
*/
(function($) {
    "use strict";
	
	
		/*PRELOADER JS*/
		$(window).on('load', function() { 
			$('.atf-status').fadeOut();
			$('.atf-preloader').delay(350).fadeOut('slow'); 
		}); 
		/*END PRELOADER JS*/

	 
	/*--------------------------------------------------------------
       Sticky Header
      --------------------------------------------------------------*/
	
		$(window).on("scroll", function() {
			 var scroll = $(window).scrollTop();
			if (scroll >= 10) {
				$('.atf-sticky-header').addClass('atf-sticky-active');
			} else {
				$('.atf-sticky-header').removeClass('atf-sticky-active');
			}
		});
     
    /*--------------------------------------------------------------
       Mobile Menu
      --------------------------------------------------------------*/

        $('.atf-nav').append('<span class="atf-menu-toggle"><span></span></span>');
        $('.menu-item-has-children').append('<span class="atf-menu-dropdown-toggle"></span>');
        $('.atf-menu-toggle').on('click', function() {
            $(this).toggleClass("atf-toggle-active").siblings('.atf-nav-list').slideToggle();;
        });
        $('.atf-menu-dropdown-toggle').on('click', function() {
            $(this).toggleClass('active').siblings('ul').slideToggle();
        });

    
    /*--------------------------------------------------------------
       One Page Navigation
      --------------------------------------------------------------*/
        // Click To Go Top
        $('.atf-smooth-move').on('click', function() {
            var thisAttr = $(this).attr('href');
            if ($(thisAttr).length) {
                var scrollPoint = $(thisAttr).offset().top - 50;
                $('body,html').animate({
                    scrollTop: scrollPoint
                }, 800);
            }
            return false;
        });

        // One Page Active Class
        var topLimit = 300,
            ultimateOffset = 200;

        $('.atf-onepage-nav').each(function() {
            var $this = $(this),
                $parent = $this.parent(),
                current = null,
                $findLinks = $this.find("a");

            function getHeader(top) {
                var last = $findLinks.first();
                if (top < topLimit) {
                    return last;
                }
                for (var i = 0; i < $findLinks.length; i++) {
                    var $link = $findLinks.eq(i),
                        href = $link.attr("href");

                    if (href.charAt(0) === "#" && href.length > 1) {
                        var $anchor = $(href).first();
                        if ($anchor.length > 0) {
                            var offset = $anchor.offset();
                            if (top < offset.top - ultimateOffset) {
                                return last;
                            }
                            last = $link;
                        }
                    }
                }
                return last;
            }

            $(window).on("scroll", function() {
                var top = window.scrollY,
                    height = $this.outerHeight(),
                    max_bottom = $parent.offset().top + $parent.outerHeight(),
                    bottom = top + height + ultimateOffset;

                var $current = getHeader(top);

                if (current !== $current) {
                    $this.find(".active").removeClass("active");
                    $current.addClass("active");
                    current = $current;
                }
            });
        });

	/*--------------------------------------------------------------
       Sticky Back To Top
      --------------------------------------------------------------*/
  
		  $(window).on('scroll', function() {
			if ($(window).scrollTop() > 50) {
				$('.atf-sticky-header').addClass('atf-nav');
				$('.atf-back-to-top').addClass('open');
			} else {
				$('.atf-sticky-header').removeClass('atf-nav');
				$('.atf-back-to-top').removeClass('open');
			}
		  });
	/*--------------------------------------------------------------
       START SCROLL UP
      --------------------------------------------------------------*/	  
			if ($('.atf-back-to-top').length) {
			  $(".atf-back-to-top").on('click', function () {
				var target = $(this).attr('data-targets');
				// animate
				$('html, body').animate({
				  scrollTop: $(target).offset().top
				}, 1000);

			  });
			}
	
	/*--------------------------------------------------------------
         END SCROLL UP
      --------------------------------------------------------------*/
	  
	  /*--------------------------------------------------------------
       Slick Slider
      --------------------------------------------------------------*/
   
        $('.atf-slider').each(function() {

            // Slick Variable
            var $ts = $(this).find('.slick-container');
            var $slickActive = $(this).find('.slick-wrapper');
            var $sliderNumber = $(this).siblings('.slider-number');

            // Auto Play
            var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
            // Auto Play Time Out
            var autoplaySpdVar = 3000;
            if (autoPlayVar > 1) {
                autoplaySpdVar = autoPlayVar;
                autoPlayVar = 1;
            }
            // Slide Change Speed
            var speedVar = parseInt($ts.attr('data-speed'), 10);
            // Slider Loop
            var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
            // Slider Center
            var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
            // Pagination
            var paginaiton = $(this).children().hasClass('pagination');
            // Slide Per View
            var slidesPerView = $ts.attr('data-slides-per-view');
            if (slidesPerView == 1) {
                slidesPerView = 1;
            }
            if (slidesPerView == 'responsive') {
                var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
                var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
                var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
                var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
                var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
            }
            // Fade Slider
            var fadeVar = parseInt($($ts).attr('data-fade-slide'));
            (fadeVar === 1) ? (fadeVar = true) : (fadeVar = false);

            // Slick Active Code
            $slickActive.slick({
                infinite: true,
                autoplay: autoPlayVar,
                dots: paginaiton,
                centerPadding: '0',
                speed: speedVar,
                infinite: loopVar,
                autoplaySpeed: autoplaySpdVar,
                centerMode: centerVar,
                fade: fadeVar,
                prevArrow: $(this).find('.slick-arrow-left'),
                nextArrow: $(this).find('.slick-arrow-right'),
                appendDots: $(this).find('.pagination'),
                slidesToShow: slidesPerView,
                responsive: [{
                        breakpoint: 1600,
                        settings: {
                            slidesToShow: lgPoint
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: mdPoint
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: smPoint
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: xsPoing
                        }
                    }
                ]
            });
        })
   

	  
	/*--------------------------------------------------------------
       END SLICK JS
      --------------------------------------------------------------*/
			
	/*--------------------------------------------------------------
       START counter JS
      --------------------------------------------------------------*/	
		$('.atf-counter-value').each(function(){
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			},{
				duration: 3500,
				easing: 'swing',
				step: function (now){
					$(this).text(Math.ceil(now));
				}
			});
		});
	/*--------------------------------------------------------------
       END counter JS
      --------------------------------------------------------------*/		
	/*--------------------------------------------------------------
       STAT VIDEO POPUP JS
      --------------------------------------------------------------*/		
			$('.popup-video').magnificPopup({
				type: 'iframe',
			});
	/*--------------------------------------------------------------
       END VIDEO POPUP JS
      --------------------------------------------------------------*/

	/*--------------------------------------------------------------
       START MAGNIFPOPUP JS
      --------------------------------------------------------------*/ 

			var magnifPopup = function() {
				$('.popup-img').magnificPopup({
					type: 'image',
					removalDelay: 300,
					mainClass: 'mfp-with-zoom',
					gallery: {
						enabled: true
					},
					zoom: {
						enabled: true, // By default it's false, so don't forget to enable it

						duration: 300, // duration of the effect, in milliseconds
						easing: 'ease-in-out', // CSS transition easing function

						// The "opener" function should return the element from which popup will be zoomed in
						// and to which popup will be scaled down
						// By defailt it looks for an image tag:
						opener: function(openerElement) {
							// openerElement is the element on which popup was initialized, in this case its <a> tag
							// you don't need to add "opener" option if this code matches your needs, it's defailt one.
							return openerElement.is('img') ? openerElement : openerElement.find('img');
						}
					}
				});
			};

			// Call the functions
			magnifPopup();
			
	/*--------------------------------------------------------------
       END MAGNIFPOPUP JS
      --------------------------------------------------------------*/
	/*--------------------------------------------------------------
       START MAILCHAMP JS
      --------------------------------------------------------------*/
	
		// mailchamp
		$('#mc-form').ajaxChimp({
			url: 'https://gmail.us10.list-manage.com/subscribe/post?u=c9af266402a277062d0d7cee0&amp;id=1211fda42f'
			/* Replace Your AjaxChimp Subscription Link */
		}); 
		
	/*--------------------------------------------------------------
       END MAILCHAMP JS
      --------------------------------------------------------------*/	
		
	/*--------------------------------------------------------------
		START WOW SCROLL SPY
      --------------------------------------------------------------*/	
		 var wow = new WOW({
			  //disabled for mobile
				mobile: false
			});

		wow.init();	
	/*--------------------------------------------------------------
		END WOW SCROLL SPY
      --------------------------------------------------------------*/	
			
     /*--------------------------------------------------------------
		START PARALLAX JS
      --------------------------------------------------------------*/	
			(function () {

				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				 
				} else {
					$(window).stellar({
						horizontalScrolling: false,
						responsive: true
					});
				}

			}());
	
	/*--------------------------------------------------------------
		END PARALLAX JS
      --------------------------------------------------------------*/	
			
     
    
})(jQuery);
