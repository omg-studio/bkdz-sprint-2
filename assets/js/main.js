(function (window, document, $) {

	// Enable strict mode
	'use strict';

	var deviceWidth, deviceHeight;
	var slider  = new MasterSlider(),
		slider2 = new MasterSlider();

	// Get viewport dimensions
	function getViewport () {
		var e = window,
			a = 'inner';

		if ( !('innerWidth' in window) ) {
			a = 'client';
			e = document.documentElement || document.body;
		} // end if

		return { width : e[ a + 'Width' ], height : e[ a + 'Height' ] };
	} // end get viewport

	// Handle viewport variables
	function handleViewport () {
		deviceWidth  = getViewport().width;
		deviceHeight = getViewport().height;
	} // end handleViewport

	// Main slider
	// slider.control('arrows');
	slider.control('timebar' , { insertTo: '#masterslider' });
	slider.control('bullets', { autohide: false });

	slider.setup('masterslider' , {
		width: 1280,
		height: 580,
		space: 0,
		layout: 'fullwidth',
		loop: true,
		preload: 0,
		autoplay: false,
		heightLimit: true,
		view: 'basic'
	});

	// Social media feed slider
	slider2.control('arrows', { autohide: false });
	// slider2.control('timebar' , { insertTo: '#masterslider2' });
	// slider2.control('bullets', { autohide: false });

	slider2.setup('masterslider2' , {
		width: 1280,
		height: 640,
		space: 0,
		layout: 'fullwidth',
		loop: true,
		preload: 0,
		autoplay: false,
		heightLimit: true
	});

	// Wait until the DOM is ready
	$(function () {

		var mainNav = $('.main-nav');

		// Access viewport dimensions variables
		handleViewport();

		// Prepend main nav if deviceWidth is less than 768px
		if ( deviceWidth < 768 ) {
			$('.utility-bar').prepend(mainNav);
			mainNav.show();
		}

		// Toggle main-nav
		$('#navbar-toggle').on('click', function (e) {
			e.preventDefault();

			$('.utility-bar').stop().slideToggle('normal', function () {
				$('#navbar-toggle').toggleClass( 'navbar-toggle-active', $('.utility-bar').is(':visible') );
			});
		});

		// Slide up mobile nav if clicked outside
		/* $(document).on('mouseup', function (e) {
			var mobileMenuContainer = $('.utility-bar');

			if ( !mobileMenuContainer.is(e.target) && mobileMenuContainer.has(e.target).length === 0 ) {
				mobileMenuContainer.slideUp('normal');
				$('#navbar-toggle').removeClass('navbar-toggle-active');
			}
		}); */

		// Scroll to welcome section
		$('a.join-now-anchor[href^="#"]').on('click',function (e) {
			e.preventDefault();

			var target = this.hash,
			$target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 900, 'swing', function () {
				window.location.hash = target;
			});

			$('#emailSignUp').focus();
		});

		// Scroll to top
		function scrollTop() {
			$('#scroll-top').click(function (e) {
				e.preventDefault();

				$('body, html').animate({
					scrollTop: 0
				}, 1000);
			});
		}
		scrollTop();

		$('#sign-up-btn').on('click', function (e) {
			e.preventDefault();

			var target = this.hash,
			$target = $(target);

			$('.sign-up-collapsible').stop().slideToggle('slow', 'easeInOutSine', function () {
				$(this).toggleClass( 'open', $('.sign-up-collapsible').is(':visible') );

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
				}, 900, 'easeInOutSine', function () {
					window.location.hash = target;
				});

				$('#emailSignUp').focus();
			});
		});

		// Kid registration slider
		$('.rights-keeper-slider').bxSlider({
			slideWidth: 142
		});

		// Custom checkbox
		/* $('input').iCheck({
			checkboxClass: 'icheckbox_flat',
		}); */

		var requiredFields    = $('.required-container'),
			requiredFieldsLen = requiredFields.length;

		console.log('Required fields on DOM ready: ' + requiredFieldsLen);

		/* if ( $('input:checkbox').prop('checked') === true ) {
			$(this).parent().addClass('valid');
			console.log('asdffsdfsadf');
		} */

		if ( $('select.required option').is(':selected') ) {
			var selectedOptions    = $('select.required option:selected'),
				selectedOptionsLen = selectedOptions.length;
			console.log('There are ' + selectedOptionsLen + ' options selected by default');
			$('select.required option:selected').closest('.required-container').addClass('valid');
		}

		$('input:checkbox:checked').closest('.required-container').addClass('valid');

		// Inline exposure
		$('#emailSignUp').on('focus', function (e) {
			var charCode = e.which || e.keyCode;

			if ( (charCode === 9) || (charCode === 16) || (charCode === 17) || (charCode === 18) || (charCode === 91) || (charCode === 93) || (charCode === 224) ) {
				return false;
			}

			if ( !$(this).closest('.required-container').hasClass('error') && !$(this).closest('.required-container').hasClass('valid') ) {
				$(this).after('<div class="inline-exposure-username inline-exposure-msg">Must be maximum 50 characters, email format</div>');
			}
		});

		$('#kidUsername').on('focus', function (e) {
			var charCode = e.which || e.keyCode;

			if ( (charCode === 9) || (charCode === 16) || (charCode === 17) || (charCode === 18) || (charCode === 91) || (charCode === 93) || (charCode === 224) ) {
				return false;
			}

			if ( !$(this).closest('.required-container').hasClass('error') && !$(this).closest('.required-container').hasClass('valid') ) {
				$(this).after('<div class="inline-exposure-username inline-exposure-msg">Must be maximum 50 characters</div>');
			}
		});

		$('#passwordSignUp, #kidPassword').on('focus', function (e) {
			var charCode = e.which || e.keyCode;

			if ( (charCode === 9) || (charCode === 16) || (charCode === 17) || (charCode === 18) || (charCode === 91) || (charCode === 93) || (charCode === 224) ) {
				return false;
			}

			if ( !$(this).closest('.required-container').hasClass('error') ) {
				$(this).after('<div class="inline-exposure-password inline-exposure-msg">Must be at least 1 number, 1 uppercase and 1 special character. Minimum 6 characters. Maximum 16 characters. Example: eXpr3$$</div>');
			}
		});

		$('#confirmPassSignUp, #kidPasswordConfirm').on('focus', function (e) {
			var charCode = e.which || e.keyCode;

			if ( (charCode === 9) || (charCode === 16) || (charCode === 17) || (charCode === 18) || (charCode === 91) || (charCode === 93) || (charCode === 224) ) {
				return false;
			}

			if ( !$(this).closest('.required-container').hasClass('error') ) {
				$(this).after('<div class="inline-exposure-password inline-exposure-msg">Must be the same as password</div>');
			}
		});

		$('#emailSignUp, #passwordSignUp, #confirmPassSignUp').on('focusout', function () {
			$('.index .inline-exposure-msg').remove();
		});

		$('.required').on('focusout change', function (e) { // keyup keypress blur focusout change
			// e.preventDefault();

			var charCode = e.which || e.keyCode;

			if ( (charCode === 9) || (charCode === 16) || (charCode === 17) || (charCode === 18) || (charCode === 91) || (charCode === 93) || (charCode === 224) ) {
				return false;
			}

			$('.registration .inline-exposure-msg').remove();

			var isValid        = false,
				validFields    = $('.required-container.valid'),
				validFieldsLen = validFields.length,
				invalidFields  = $('.required-container.error'),
				invalidFieldsLen = invalidFields.length;

			$('.required').each(function () {
				if ( requiredFieldsLen === validFieldsLen ) {
					isValid = true;
				}
			});

			if ( isValid /* && $('#agree-terms').is(':checked') */ ) {
				$('.save-continue, #add-kid').prop('disabled', false);
			} else {
				$('.save-continue, #add-kid').prop('disabled', true);
			}

			console.log('There are ' + invalidFieldsLen + ' invalid fields.');

			// return false;
		});

		// Check first name
		$.validator.addMethod('firstNameCheck', function (value, element) {
			return (/^([a-zA-Z .'-]{2,80})+$/).test(value);
		}, 'Please enter a valid name');

		// Check last name
		$.validator.addMethod('lastNameCheck', function (value, element) {
			return (/^([a-zA-Z .'-]{3,80})+$/).test(value);
		}, 'Please enter a valid last name');

		// Check date of birth
		$.validator.addMethod('FullDate', function () {
			if($('#day').val() !== '' && $('#month').val() !== '' && $('#year').val() !== '') {
				return true;
			} else {
				return false;
			}
		}, 'Full date of birth is required');

		// Check password
		$.validator.addMethod('password', function (value, element) {
			return (/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,16}$/).test(value);
		}, 'Please enter a valid password');

		// Check phone
		$.validator.addMethod('phone', function (value, element) {
			if (value !== element.defaultValue) {
				return this.optional(element) || /^[01]?[- .]?\(?[2-9]\d{2}\)?[- .]?\d{3}[- .]?\d{4}$/.test(value);
			}
			return true;
		}, 'This is not a valid number');

		// Parent registration
		$('#parent-registration').validate({
			invalidHandler: function (form, validator) {
				var errors = validator.numberOfInvalids();

				console.log(errors + ' errors!');
			},
			/* onkeyup: function (element) {
				$(element).valid();
			}, */
			onkeyup: false,
			onfocusout: function (element) {
				$(element).valid();
			},
			rules: {
				firstName: { required: true, firstNameCheck: true },
				lastName: { required: true, lastNameCheck: true },
				street: { required: true },
				suburb: { required: true }
			},
			messages: {
				firstName: {
					required: 'Please fill in this field'
				},
				lastName: {
					required: 'Please fill in this field'
				},
				street: {
					required: 'Please fill in this field'
				},
				suburb: {
					required: 'Please fill in this field'
				}
			},
			errorPlacement: function (error, element) {
				// console.log(element);
				$(element).closest('.required-container').next().append(error);
			},
			highlight: function(element, errorClass, validClass) {
				$(element).closest('.required-container').addClass('error').removeClass('valid');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).closest('.required-container').removeClass('error').addClass('valid');
			}
		});

		// Kid registration
		$('#kid-registration').validate({
			invalidHandler: function (form, validator) {
				var errors = validator.numberOfInvalids();

				console.log(errors + ' errors!');
			},
			/* onkeyup: function (element) {
				$(element).valid();
			}, */
			onkeyup: false,
			onfocusout: function (element) {
				$(element).valid();
			},
			rules: {
				kidFirstName: { required: true, firstNameCheck: true },
				kidLastName: { required: true, lastNameCheck: true },
				kidUsername: { required: true },
				kidPassword: { required: true, password: true },
				kidPasswordConfirm: { equalTo: '#kidPassword' },
				day: 'FullDate',
				month: 'FullDate',
				year: 'FullDate'
			},
			groups: {
				dateOfBirth: 'day month year'
			},
			messages: {
				kidFirstName: {
					required: 'Please fill in this field'
				},
				kidLastName: {
					required: 'Please fill in this field'
				},
				kidUsername: {
					required: 'Please fill in this field'
				},
				kidPassword: {
					required: 'Please fill in this field'
				},
				kidPasswordConfirm: {
					required: 'Please fill in this field',
					equalTo: 'Password must be the same'
				}
			},
			errorPlacement: function (error, element) {
				// console.log(element);
				$(element).closest('.required-container').next().append(error);
			},
			highlight: function(element, errorClass, validClass) {
		        $(element).closest('.required-container').addClass('error').removeClass('valid');
		    },
		    unhighlight: function(element, errorClass, validClass) {
		        $(element).closest('.required-container').removeClass('error').addClass('valid');
		    }
		});

		// My preferences
		$('#my-preferences').validate({
			invalidHandler: function (form, validator) {
				var errors = validator.numberOfInvalids();

				console.log(errors + ' errors!');
			},
			onkeyup: function (element) {
				$(element).valid();
			},
			onfocusout: function (element) {
				$(element).valid();
			},
			errorPlacement: function (error, element) {
				// console.log(element);
				$(element).closest('.required-container').next().append(error);
			},
			highlight: function(element, errorClass, validClass) {
		        $(element).closest('.required-container').addClass('error').removeClass('valid');
		    },
		    unhighlight: function(element, errorClass, validClass) {
		        $(element).closest('.required-container').removeClass('error').addClass('valid');
		    }
		});

		// Check if all fields are empty or not on keyup
		/* $('.required').on('keyup', function () {
			var empty = false;

			$('.required').each(function () {
				if ( $.trim($(this).val()).length === 0 ) {
					empty = true;
				}
			});

			if ( empty ) {
				$('#step-2').prop('disabled', true);
			} else {
				$('#step-2').prop('disabled', false);
			}
		}); */

		$('.save-continue').on('click', function (e) {
			e.preventDefault();

			if ( !$('.overlay').is(':visible') ) {
				$('body').append('<div class="overlay"></div>');
				$('.overlay').append('<div class="alert"><p></p></div>');
				$('.alert').append('<a class="close-overlay" href="#">&times;</a>');
				$('.alert p').html('Sorry! Username already exists!');
				$('.overlay').fadeIn('fast');

				$('.close-overlay').on('click', function (e) {
					e.preventDefault();
					$('.overlay').fadeOut('fast', function () {
						$(this).remove();
					});
				});
			}

			$(document).on('mouseup', function (e) {
				var alert   = $('.alert'),
					overlay = $('.overlay');

				if ( !alert.is(e.target) && alert.has(e.target).length === 0 ) {
					overlay.fadeOut('fast', function () {
						$(this).remove();
					});
				}
			});
		});

		// Log viewport dimensions
		console.log('Viewport width: ' + deviceWidth + 'px.');
		console.log('Viewport height: ' + deviceHeight + 'px.');

	});

	// Window resize
	$(window).resize(function () {

		var mainNav = $('.main-nav');

		// Access viewport dimensions variables
		handleViewport();

		// Check if `deviceWidth` is greater than 320 pixels to
		// prevent `utility-bar` to remain hidden if the mobile
		// navigation is closed
		if ( deviceWidth > 320 && $('.utility-bar').is(':hidden') ) {
			$('.utility-bar').removeAttr('style');
		}

		if ( deviceWidth < 768 ) {
			$('.utility-bar').prepend(mainNav);
			mainNav.show();
		} else {
			$('.utility-bar .main-nav').remove();
			$('.wrap-header').append(mainNav);
		}

		// Log viewport dimensions
		console.log('Viewport width: ' + deviceWidth + ', viewport height: ' + deviceHeight + '.');

	}); // end window resize

	// Wait until the document is fully loaded
	$(window).load(function () {

		// Show scroll to top link
		$(window).scroll(function () {
			if ( $(this).scrollTop() > $('.top-bar').innerHeight() ) {
				$('#scroll-top').fadeIn('normal');
			} else {
				$('#scroll-top').stop().fadeOut('normal');
			}
		}); // end scroll top

	}); // end window load

}(window, window.document, window.jQuery));
