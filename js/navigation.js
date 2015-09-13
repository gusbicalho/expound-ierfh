/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
var $ = jQuery;
( function() {
  var slideDuration = 150;
	var container = $('#site-navigation'),
	    button    = container.find( 'h1' ).first(),
	    menu      = container.find( 'ul' ).first();

	if ( !button || !button.length || !menu || !menu.length)
		return false;

	button.click(function() {
    console.log('lol');
		if (!menu.hasClass( 'nav-menu' ))
			menu.addClass('nav-menu');

		if (button.hasClass('toggled-on')) { // Hide emenu
      menu.slideUp(slideDuration, 'swing', function() {
        button.removeClass('toggled-on');
        container.removeClass('main-small-navigation');
        container.addClass('navigation-main');
        menu.removeClass('toggled-on');
        menu.css('display', '');
      });
		} else { // Show menu
      button.addClass('toggled-on');
      container.removeClass('navigation-main');
      container.addClass('main-small-navigation');
      menu.slideDown(slideDuration, 'swing', function() {
        menu.addClass('toggled-on');
        menu.css('display', '');
      });
		}
	});

	// Hide menu toggle button if menu is empty.
	if (!menu.children().length)
		button.style.display = 'none';

	/**
   * Fix child menus for touch devices.
   * @param {JQuery} container
   */
	function fixMenuTouchTaps(container) {
		var touchStartFn;
		var parentLink = container.find('.menu-item-has-children > a, .page_item_has_children > a');

		if ('ontouchstart' in window) {
			touchStartFn = function(e) {
				var menuItem = this.parentNode;

				if (!menuItem.classList.contains('focus')) {
					e.preventDefault();
					for( var i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem === menuItem.parentNode.children[i] ) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove('focus');
					}
					menuItem.classList.add('focus');
				} else {
					menuItem.classList.remove('focus');
				}
			};

			parentLink.children().on('touchstart', touchStartFn, false);
		}
	}
	fixMenuTouchTaps(container);
} )();