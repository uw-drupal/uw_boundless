/**
 * Dawgdrops main menu behaviors.
 */

(function ($, Drupal, drupalSettings) {
  "use strict";
  Drupal.dawgDrops = Drupal.dawgDrops || {};

  Drupal.dawgDrops.isMobile = false;
  Drupal.dawgDrops.windowWidth = 0;
  Drupal.dawgDrops.mobileMax = 767;

  Drupal.behaviors.dawgDrops = {

    attach : function (context, settings) {

      // $('.js-dawgdrops .js-dawgdrops-inner').once('js-dawgdrops-inner').each(function() {
      $(once('js-dawgdrops-inner', '.js-dawgdrops .js-dawgdrops-inner', context)).each(function() {

        /** KEYBOARD NAVIGATION **/

        // Add a keydown event listener to the dawgdrops menu
        var navParent = document.querySelector('.js-dawgdrops-inner');
        if (navParent !== null) {
          navParent.addEventListener('keydown', keydownEvent);
        }

        // The current target of the keydown event.
        var $targetA = '';

        // Key pressed
        function keydownEvent(k) {
          $targetA = $(k.target);

          // Determine key
          switch(k.keyCode) {

            // ESC
            case 27:
              nav_esc();
              break;

            // LEFT
            case 37:
              k.preventDefault();
              nav_left();
              break;

            // UP
            case 38:
              k.preventDefault();
              nav_up();
              break;

            // RIGHT
            case 39:
              k.preventDefault();
              nav_right();
              break;

            // DOWN
            case 40:
              k.preventDefault();
              nav_down();
              break;

            // Else
            default:
              // Do nothing

          }
        }

        // Escape
        function nav_esc() {
          nav_close_submenus();
        }

        // Left
        function nav_left() {
          if (!Drupal.dawgDrops.isMobile) {
            nav_prev_toplink();
          }
        }

        // Right
        function nav_right() {
          if (!Drupal.dawgDrops.isMobile) {
            nav_next_toplink();
          }
        }

        // Up
        function nav_up() {
          if (nav_is_toplink()) {
            // From a top level item, go to previous sibling if any.
            nav_prev_toplink();
          }
          else if (nav_is_first_item()) {
            // From the first item in a submenu, go to parent top-level item.
            nav_parent_toplink();
          }
          else {
            // For non-first submenu items, go to previous sibling.
            nav_prev_sibling();
          }
        }

        // Down
        function nav_down() {
          var isToplink = nav_is_toplink();
          if (Drupal.dawgDrops.isMobile) {
            // From a top level item, go to the first visible submenu item or
            // the next top item.
            if (isToplink && nav_is_submenu_open()) {
                nav_first_sublink();
            }
            else if (isToplink || nav_is_last_item()) {
              // From a top level item with no visible submenu, or the last link
              // in a submenu, go to the next top link.
              nav_next_toplink();
            }
            else {
              // On non-last submenu items, go to the next sibling.
              nav_next_sibling();
            }
          }
          else {
            // From a top level item, go to the first visible submenu item. From
            // the last item in a submenu, go back to the first item.
            if ((isToplink && nav_has_submenu()) || nav_is_last_item()) {
              // On a top-level item, go to first submenu item.
              nav_first_sublink();
            }
            else {
              // On non-last submenu items, go to the next sibling.
              if (!isToplink) {
                nav_next_sibling();
              }
            }
          }
        }

        /* Helper Functions */
        // Determines if the current item is a top level menu item.
        function nav_is_toplink() {
          return $targetA.parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').parent('ul').hasClass('js-dawgdrops-nav');
        }

        // Determines if the current item has a submenu.
        function nav_has_submenu() {
          return $targetA.hasClass('dropdown-toggle');
        }

        // Determines if a top level item's submenu open (visible). Returns
        // false if there is no submenu.
        function nav_is_submenu_open() {
          if (!nav_has_submenu()) {
            return false;
          }
          var $parent = $targetA.closest('.dawgdrops-item');
          return (!Drupal.dawgDrops.isMobile && $parent.hasClass('open')) || (Drupal.dawgDrops.isMobile && $parent.hasClass('js-dawgdrops-clicked'));
        }

        // Determines if the current item is the first item in its level.
        function nav_is_first_item() {
          return $targetA.parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').hasClass('first');
        }

        // Determines if the current item is the last item in its level.
        function nav_is_last_item() {
          return $targetA.parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').hasClass('last');
        }

        // Close all submenus
        function nav_close_submenus() {
          var closeSpeed = Drupal.dawgDrops.isMobile ? 'fast' : 0;
          $('.js-dawgdrops-menu').hide(closeSpeed, function() {
            $(this).css('display', '');
            $('.js-dawgdrops-item').removeClass('js-dawgdrops-clicked');
            $('.js-dawgdrops-nav .open').removeClass('open');
          });
          ariaCheck();
        }

        // Finds the first item in the closest submenu.
        // If the current target is a top level item, it will find the first
        // item in its submenu. If the target is a submenu item, it will find
        // the first sibling item.
        function nav_first_sublink() {
          var $closestSubmenu = $targetA.closest('li.js-dawgdrops-item.dropdown');
          $closestSubmenu.find('ul.js-dawgdrops-menu li.js-dawgdrops-item.first a').first().focus();
        }

        // Go to the next item on the same level.
        function nav_next_sibling() {
          var $ddItem = $targetA.closest('li.js-dawgdrops-item');
          var $nextDdItem = $ddItem.next('li.js-dawgdrops-item');
          if ($nextDdItem.length) {
            $targetA.closest('li.js-dawgdrops-item').next().find('.js-dawgdrops-link > a').first().focus();
          }
        }

        // Go to the previous item on the same level.
        function nav_prev_sibling() {
          $targetA.parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').prev().find('.js-dawgdrops-link > a').first().focus();
        }

        // Go to the next top level item.
        function nav_next_toplink() {
          $targetA.parents('.js-dawgdrops-nav > .js-dawgdrops-item').next().find('.js-dawgdrops-link > a').first().focus();
          nav_close_submenus();
        }

        // Go to the previous top level item.
        function nav_prev_toplink() {
          $targetA.parents('.js-dawgdrops-nav > .js-dawgdrops-item').prev().find('.js-dawgdrops-link > a').first().focus();
          nav_close_submenus();
        }

        // From a submenu item, go to its parent top level item.
        function nav_parent_toplink() {
          $targetA.parents('.js-dawgdrops-item.dropdown').find('.js-dawgdrops-link > a').first().focus();
        }

        /** End KEYBOARD NAVIGATION **/

        var ariaCheck = function () {
          $('.js-dawgdrops-nav > li.js-dawgdrops-item', this).each(function () {
            if ($(this).is('.dropdown')) {
              // Menu item has dropdown
              if (!$(this).is('.open')) {
                // Menu item has dropdown class and is closed, so apply
                // appropriate ARIA attributes.
                // $(this).children().attr('aria-expanded', 'false');
                $(this).find('.dropdown-toggle').attr('aria-expanded', 'false');
              }
              else if ($(this).is('.open')) {
                // Menu item has dropdown class and is open, so apply
                // appropriate ARIA attributes.
                // $(this).children().attr('aria-expanded', 'true');
                $(this).find('.dropdown-toggle').attr('aria-expanded', 'true');
              }
            }
            else {
              // Menu item doesn't have children, so remove ARIA attributes.
              // $(this).children().removeAttr('aria-expanded');
              $(this).find('.dropdown-toggle').removeAttr('aria-expanded');
            }
          });
        };

        var showMenu = function ($subMenu, mm_timeout) {
          if ($subMenu.hasClass('dropdown')) {
            $subMenu.addClass('animating');
            clearTimeout($subMenu.data('animatingTimeout'));
            $subMenu.data('animatingTimeout', setTimeout(function () {
              $subMenu.removeClass('animating')
            }, mm_timeout));
            clearTimeout($subMenu.data('hoverTimeout'));
            $subMenu.data('hoverTimeout', setTimeout(function () {
              $subMenu.addClass('open');
              ariaCheck();
            }, 100));
          }
          else {
            clearTimeout($subMenu.data('hoverTimeout'));
            $subMenu.data('hoverTimeout',
                setTimeout(function () {
                  $subMenu.addClass('open');
                  ariaCheck();
                }, 100));
          }
        };

        var hideMenu = function ($subMenu, mm_timeout) {
          // $subMenu.children('.dropdown-toggle').attr('aria-expanded', 'false');
          if ($subMenu.hasClass('dropdown')) {
            $subMenu.addClass('animating');
            clearTimeout($subMenu.data('animatingTimeout'));
            $subMenu.data('animatingTimeout', setTimeout(function () {
              $subMenu.removeClass('animating')
            }, mm_timeout));
            clearTimeout($subMenu.data('hoverTimeout'));
            $subMenu.data('hoverTimeout', setTimeout(function () {
              $subMenu.removeClass('open');
              ariaCheck();
            }, 100));
          }
          else {
            clearTimeout($subMenu.data('hoverTimeout'));
            $subMenu.data('hoverTimeout', setTimeout(function () {
              $subMenu.removeClass('open');
              ariaCheck();
            }, 100));
          }
        };

        // Mobile behavior
        $('.js-dawgdrops-item.dropdown .js-dawgdrops-menu').each(function() {
          var $parent = $(this).closest('.js-dawgdrops-item');
          var $parentClone = $parent.clone();
          $parentClone.children('.dawgdrops-menu').remove();
          $parentClone.removeClass('expanded dropdown last').addClass('parent-clone mobile-only');
          $parentClone.find('a').removeClass('dropdown-toggle');
          $(this).prepend($parentClone);
        });

        $('.js-dawgdrops .dropdown-toggle').on('click', function (e) {
          if (Drupal.dawgDrops.isMobile) {
            e.preventDefault();
            var $this = $(this);
            var $parent = $this.closest('.js-dawgdrops-item');
            var $subMenu = $parent.find('.js-dawgdrops-menu');

            var $copyParent = $this.clone();

            // If the menu link has already been clicked once...
            if ($parent.hasClass('js-dawgdrops-clicked')) {
              $parent.removeClass('js-dawgdrops-clicked');
              $subMenu.hide('fast', function() {
                $subMenu.css('display', '');
              });
            }
            else {
              // Open the submenu.
              $parent.addClass('js-dawgdrops-clicked');
              $subMenu.show('fast');
            }
          }
        });

        // Move the 'first' class to the cloned parent for mobile.
        function toggleSubmenuFirstLinks() {
          if (Drupal.dawgDrops.isMobile) {
            $('.dawgdrops-item.mobile-only').each(function () {
              $(this).siblings('.dawgdrops-item.first').removeClass('first');
              $(this).addClass('first');
            });
          }
          else {
            $('.dawgdrops-item.mobile-only').each(function () {
              $(this).next().addClass('first');
              $(this).removeClass('first');
            });
          }
        }

        // Detect if the device is a touch screen.
        var isTouch = window.matchMedia('(pointer: coarse)').matches;

        if (!isTouch) {
          var mm_duration = 0;

          $('.js-dawgdrops-inner', context).each(function () {
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });

          var mm_timeout = mm_duration ? 100 + mm_duration : 500;

          $('li.js-dawgdrops-item.dropdown', context).bind('mouseenter', function (event) {
            if (!Drupal.dawgDrops.isMobile) {
              showMenu($(this), mm_timeout);
            }
          });

          $('li.js-dawgdrops-item.dropdown a.dropdown-toggle', context).bind('focus', function (event) {
            var $this = $(this);
            var $subMenu = $this.closest('li');
            showMenu($subMenu, mm_timeout);
            // If the focus moves outside of the subMenu, close it.
            $(document).bind('focusin', function (event) {
              if ($subMenu.has(event.target).length) {
                return;
              }
              $(document).unbind(event);
              hideMenu($subMenu, mm_timeout);
            });
          });

          $('li.js-dawgdrops-item.dropdown', context).bind('mouseleave', function (event) {
            if (!Drupal.dawgDrops.isMobile) {
              hideMenu($(this), mm_timeout);
            }
          });

          /**
           * Allow tabbing by appending the open class.
           * Works in tandem with CSS changes that utilize opacity rather than
           * display none
           */
          // If the selected anchor is not in the Dawgdrops menu, remove all
          // "open" class occurrences
          $('a').focus(function (event) {
            if (!$(this).parent().parent('li').hasClass('js-dawgdrops-item') && !$(this).parents('.js-dawgdrops').length) {
              nav_close_submenus();
            }
          });

          $('.nav > li > a, li.js-dawgdrops-item.dropdown > .js-dawgdrops-link > a').focus(function (event) {
            // Remove all occurrences of "open" from other menu trees
            var siblings = $(this).parents('.js-dawgdrops-item').siblings();
            $.each(siblings, function (i, v) {
              var cousins = $(v).find('.open');
              $.each(cousins, function (index, value) {
                $(value).removeClass('open');
                ariaCheck($(this));
              });
              $(v).removeClass('open');
              ariaCheck();
            });
            // Open the submenu if the selected item has one
            // @todo Remove if unused.
            if ($(this).next('.js-dawgdrops-submenu').length > 0) {
              if (!$(this).parent().hasClass('open')) {
                $(this).parent().addClass('open');
              }
            }
            // If the anchor's top-level parent is not open, open it
            if (!$(this).closest('.js-dawgdrops-item.dropdown').hasClass('open') && $(this).closest('.js-dawgdrops-item.dropdown').find('.js-dawgdrops-menu').length > 0) {
              $(this).closest('.js-dawgdrops-item.dropdown').addClass('open');
              ariaCheck();
            }
            // If anchor's parent submenus are not open, open them.
            // @todo Remove if unused.
            var parents = $(this).parents('.js-dawgdrops-item.dropdown-submenu');
            $.each(parents, function (i, v) {
              if (!$(v).hasClass('open')) {
                $(v).addClass('open');
                ariaCheck();
              }
            });
          });
        }


        // Define actions for touch devices.
        var createTouchMenu = function (items) {
          $(items).children('a, span').each(function () {
            var $item = $(this);
            var dditem = $(this).parent();

            $item.click(function (event) {
              // If the menu link has already been clicked once...
              if ($item.hasClass('js-dawgdrops-clicked')) {
                var $uri = $item.attr('href');

                // If the menu link has a URI, go to the link.
                // <nolink> menu items will not have a URI.
                if ($uri) {
                  window.location.href = $uri;
                }
                else {
                  $item.removeClass('js-dawgdrops-clicked');
                  hideMenu(dditem, mm_timeout);
                }
              }
              else {
                event.preventDefault();

                // Hide any already open menus.
                nav_close_submenus();

                // Open the submenu.
                $item.addClass('js-dawgdrops-clicked');
                showMenu(dditem, mm_timeout);
              }
            });
          });

          // Anytime there's a click outside the menu, close the menu.
          $(document).on('click', function (event) {
            if ($(event.target).closest('.js-dawgdrops-nav').length === 0) {
              nav_close_submenus();
            };
          })
        };

        if (isTouch) {
          createTouchMenu($('.js-dawgdrops-nav > li.js-dawgdrops-item', context).has('ul.js-dawgdrops-menu'));
        };


        // On window load and resize, assess whether it's a 'mobile' width.
        $(window).on('load resize', function () {
          var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
          var isMobile = windowWidth <= Drupal.dawgDrops.mobileMax;

          // Set the new values.
          Drupal.dawgDrops.isMobile = isMobile;
          Drupal.dawgDrops.windowWidth = windowWidth;

          toggleSubmenuFirstLinks();

          if (!Drupal.dawgDrops.isMobile) {
            nav_close_submenus();
          }
        });

      });
    },
  }
})(jQuery, Drupal, drupalSettings);
