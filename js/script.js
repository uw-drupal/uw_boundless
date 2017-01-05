
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

    // The document ready event executes when the HTML-Document is loaded
    // and the DOM is ready.
    jQuery(document).ready(function($) {

        /**
         * this displays/hides the search area
         */
        UW.search.initialize();

        /**
         * this displays/hides the quicklinks
         */
        UW.quicklinks.initialize();

        /**
         * this displays/hides the mobile-menu on a click event
         */
        $("button.uw-mobile-menu-toggle").click(function(event) {
            $("ul.uw-mobile-menu").toggle(200, "swing", function() {
                // Animation complete.
            }, function() {
                // Animation complete.
            });
        });

        /**
        * Setup the keyboard navigation for the drop down menu
        */
        $('.dawgdrops-nav').dawgDrops();
        
        /**
         * add second level menu links to toggle second level menu items.
         * only when $primary_nav is rendered as mobile-nav
         */
        $('#mobile-relative .navbar-nav > li.dawgdrops-item.expanded').prepend('<a class="dawgdrops-item-menu-link">menu</a>');
        $(".dawgdrops-item-menu-link").click(function(event) {
            // targets the dawgdrops-menu submenu in this dawgdrops-item
            $(this).next().next(".dawgdrops-menu").toggle(200, "swing", function() {
                // Animation complete.
            }, function() {
                // Animation complete.
            });
        });

    });//document.ready

    // Drupal behaviors 
    Drupal.behaviors.myBehavior = {
      // Attach behaviors that should be reloaded after AJAX calls.
      attach: function (context, settings) {
        $('.radio').each(function() { $(this).radio() });
        $('.checkbox').each(function() { $(this).radio() });
      }
    };

    // The window load event executes after the document ready event,
    // when the complete page is fully loaded.
    jQuery(window).load(function() {

        /**
         * reposition the alert banner in the DOM
         */
        $("#uwalert-alert-message").insertAfter("header.uw-thinstrip");

    });//window.load

})(jQuery, Drupal, this, this.document);