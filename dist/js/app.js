/*!
 * csm
 * @author: nechiporenko
 * @version: 0.0.1
 * Copyright 2019.
 */

window.onload = function(){
	'use strict';
	/**
	 * Sticky header & scroll to top button
	 */
	(function(){
		var header = document.getElementsByClassName('js-header')[0],
			htop = header.getElementsByClassName('js-header-top')[0],
			target = header.getElementsByClassName('js-header-main')[0],
			up_button = document.getElementsByClassName('js-scroll_btn')[0],
			isStick = false,
			htopHeight = null,
			lastHtopHeight = null,
			stickyClass = 'sticky',
			activeClass = 'active',
			rtime,
			timeout = false,
			delta = 200,
			methods = {
				init: function(){
					htopHeight = methods.checkHtopHeight();
					lastHtopHeight = htopHeight;
					methods.wrapTarget();
					methods.checkHeaderPosition();
					window.addEventListener('scroll', methods.checkHeaderPosition);
					window.addEventListener('resize', methods.startResize);
				},
				checkHtopHeight: function(){
					return htop.offsetHeight;
				},
				wrapTarget: function(){
					var wrap = document.createElement('div');
					wrap.classList.add('js-wrap');
					target.parentNode.insertBefore(wrap, target);
					wrap.appendChild(target);
				},
				checkHeaderPosition: function(){
					var fromTop = htop.getBoundingClientRect().top + document.body.scrollTop;
					if ( (fromTop + htopHeight) <=0 && !isStick  ){
						methods.makeHeaderStick();
					}
			
					if ( (fromTop + htopHeight) >0 && isStick ){
						methods.makeHeaderUnstick();
					}
				},
				makeHeaderStick: function(){
					console.log('stick');
					isStick = true;
					header.classList.add(stickyClass);
					up_button.classList.add(activeClass);
					up_button.addEventListener('click', methods.scrollToTop);
				},
				makeHeaderUnstick: function(){
					console.log('unstick');
					isStick = false;
					header.classList.remove(stickyClass);
					up_button.classList.remove(activeClass);
					up_button.removeEventListener('click', methods.scrollToTop);
				},
				startResize: function(){
					rtime = new Date();
					if (false === timeout) {
						timeout = true;
						setTimeout(methods.endResize, delta);
					}
				},
				endResize: function(){
					if (new Date() - rtime < delta) {
						setTimeout(methods.endResize, delta);
					} else {
						timeout = false;
						var h = methods.checkHtopHeight();
						if (h !== lastHtopHeight) {
							htopHeight = h;
							lastHtopHeight = h;
							methods.checkHeaderPosition();
						}
					}
				},
				scrollToTop: function(){
					var start = Date.now(),
						timer = setInterval(function() { 
						var timePassed = Date.now() - start,
							time = 2000,
							scrolled = window.pageYOffset || document.documentElement.scrollTop;

						if (timePassed >= time || scrolled <= 0) {
							clearInterval(timer);
							return;
						}
						up (timePassed,time,scrolled);
					}, 10);
			
					function up(timePassed,time,scrolled) {
						if (scrolled > 0) {
							var x = scrolled - (scrolled*timePassed/(2*time));
							window.scrollTo(0,x); 
						}
					}
				}
			};

			methods.init();
	})();

	/**
	 * Open & close mobile menu
	 */
	(function(){
		var menu = document.getElementsByClassName('js-menu')[0],
			btn_open = document.getElementsByClassName('js-menuopen-btn')[0],
			btn_close = document.getElementsByClassName('js-menuclose-btn')[0],
			activeClass = 'active',
			overlay = null,
			methods = {
				init: function(){
					var header = document.getElementsByClassName('js-header')[0];
					overlay = document.createElement('div', {id: "m_ovrl"});
					overlay.classList.add('js-overlay');
					header.insertBefore(overlay, header.firstChild);
					btn_open.addEventListener('click', methods.openMenu);
				},
				openMenu: function(){
					menu.classList.add(activeClass);
					overlay.classList.add(activeClass);
					btn_close.addEventListener('click', methods.closeMenu);
					overlay.addEventListener('click', methods.closeMenu);
				},
				closeMenu: function(){
					menu.classList.remove(activeClass);
					overlay.classList.remove(activeClass);
					btn_close.removeEventListener('click', methods.closeMenu);
					overlay.removeEventListener('click', methods.closeMenu);
				}
			};
			methods.init();
	})();
};