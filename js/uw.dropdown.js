// Drupal.dawgDrops = Drupal.dawgDrops || {};

(function ($, Drupal, drupalSettings) {
  "use strict";
  Drupal.dawgDrops = Drupal.dawgDrops || {};
  // UW = (typeof(UW) === 'undefined') ? {} : UW;

  Drupal.dawgDrops.displayedMenuMobile = false;

  Drupal.behaviors.dawgDrops = {
  // UW.dawgDrops = {

    // nav      : '.dawgdrops-nav',
    // topLevel : '.dawgdrops-nav > .dawgdrops-item',
    // submenu  : '.dawgdrops-menu',

    attach : function (context, settings) {

      $('.js-dawgdrops .js-dawgdrops-inner'/*, context*/).once('js-dawgdrops-inner').each(function() {
      // $('#dawgdrops .dawgdrops-wrapper'/*, context*/).once('dawgdrops-wrapper').each(function() {

        var navParent = document.querySelector('.js-dawgdrops-inner');
        // var navParent = document.querySelector('.dawgdrops-wrapper');

        /* Event Listener */
        // On Keydown
        if (navParent !== null) {
          navParent.addEventListener('keydown', keydownEvent);
        }

        // Key pressed
        function keydownEvent(k) {

          // Determine key
          switch(k.keyCode) {

            // ESC
            case 27:
              nav_esc();
              break;

            // LEFT
            case 37:
              k.preventDefault();
              nav_left(k);
              break;

            // UP
            case 38:
              k.preventDefault();
              nav_up(k);
              break;

            // RIGHT
            case 39:
              k.preventDefault();
              nav_right(k);
              break;

            // DOWN
            case 40:
              k.preventDefault();
              nav_down(k);
              break;

            // Else
            default:
              // Do nothing

          } // determine key
        } // keydownEvent


        // Open Link
        // function nav_open_link() {
        //   linkArray[curPos[0]][curPos[1]][curPos[2]].click();
        // }

        // Escape
        function nav_esc() {
          nav_close_submenus();
        }

        // Left
        function nav_left(k) {
          nav_prev_toplink(k);
        }

        // Right
        function nav_right(k) {
          nav_next_toplink(k);
        }

        // Up
        function nav_up(k) {
          if (nav_is_toplink(k)) {
            // On a top-level item, go to previous sibling if any (like
            // shift+tab).
            nav_prev_toplink(k);
          }
          else if (nav_is_first(k)) {
            // On the first item in a submenu, go to parent top-level item.
            nav_parent_toplink(k);
          }
          else {
            // For other submenu items, go to previous sibling.
            // $(k.target).parent().prev().children('a').first().focus();
            $(k.target).parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').prev().find('.js-dawgdrops-link > a').first().focus();
          }
        }

        // Down
        function nav_down(k) {
          if (nav_is_toplink(k)) {
            // Go to the first submenu item, if one exists. Do nothing if there
            // is no submenu.
            if (nav_has_submenu(k)) {
              // On a top-level item, go to first submenu item.
              // $(k.target).siblings('ul.dawgdrops-menu').find('a').first().focus();
              $(k.target).parent('.js-dawgdrops-link').siblings('ul.js-dawgdrops-menu').find('.js-dawgdrops-link > a').first().focus();
            }
          }
          else if (nav_is_last(k)) {
            // On the last submenu item, go back to the first.
            nav_first_sublink(k);
          }
          else {
            // On other submenu items, go to the next sibling.
            $(k.target).parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').next().find('.js-dawgdrops-link > a').first().focus();
          }
        }

        // Home Button
        // function nav_home() {
        //   if (nav_is_toplink()) {
        //     linkArray[0][-1].focus();
        //   }
        //   else {
        //     linkArray[curPos[0]][0][0].focus();
        //   }
        // }

        // End Button
        // function nav_end() {
        //   if (nav_is_toplink()) {
        //     linkArray.slice(-1)[0][-1].focus();
        //   }
        //   else {
        //     linkArray[curPos[0]].slice(-1)[0].slice(-1)[0].focus();
        //   }
        // }

        /* Helper Functions */
        // Determine Link Level
        function nav_is_toplink(k) {
          // return $(k.target).parent('li.dawgdrops-item').parent('ul').hasClass('dawgdrops-nav');
          return $(k.target).parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').parent('ul').hasClass('js-dawgdrops-nav');
        }

        function nav_has_submenu(k) {
          return $(k.target).hasClass('dropdown-toggle');
        }

        function nav_is_first(k) {
          // return $(k.target).parent('li.dawgdrops-item').hasClass('first');
          return $(k.target).parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').hasClass('first');
        }

        function nav_is_last(k) {
          // return $(k.target).parent('li.dawgdrops-item').hasClass('last');
          return $(k.target).parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').hasClass('last');
        }

        function nav_first_sublink(k) {
          $(k.target).parent('.js-dawgdrops-link').parent('li.js-dawgdrops-item').parent('ul.js-dawgdrops-menu').find('li.first > .js-dawgdrops-link > a').first().focus();
        }

        // Close all submenus
        function nav_close_submenus() {
          $('.js-dawgdrops-nav .open').removeClass('open');
          ariaCheck();
        }

        // Next Toplink
        function nav_next_toplink(k) {
          $(k.target).parents('.js-dawgdrops-nav > .js-dawgdrops-item').next().find('.js-dawgdrops-link > a').first().focus();
          nav_close_submenus();
        }

        function nav_prev_toplink(k) {
          $(k.target).parents('.js-dawgdrops-nav > .js-dawgdrops-item').prev().find('.js-dawgdrops-link > a').first().focus();
          nav_close_submenus();
        }

        // Go to Parent Toplink
        function nav_parent_toplink(k) {
          $(k.target).parents('.js-dawgdrops-item.dropdown').find('.js-dawgdrops-link > a').first().focus();
        }

        var ariaCheck = function () {
          $('.js-dawgdrops-nav > li.js-dawgdrops-item', this).each(function () {
            if ($(this).is('.dropdown')) {
              // Menu item has dropdown
              if (!$(this).is('.open')) {
                // Menu item has dropdown class and is closed, so apply
                // appropriate ARIA attributes.
                $(this).children().attr('aria-expanded', 'false');
              }
              else if ($(this).is('.open')) {
                // Menu item has dropdown class and is open, so apply
                // appropriate ARIA attributes.
                $(this).children().attr('aria-expanded', 'true');
              }
            }
            else {
              // Menu item doesn't have children, so remove ARIA attributes.
              $(this).children().removeAttr('aria-expanded');
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
          $subMenu.children('.dropdown-toggle').attr('aria-expanded', 'false');
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

        // $('.tb-megamenu-button', this).click(function () {
        //   if (parseInt($(this).parent().children('.nav-collapse').height())) {
        //     $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
        //     Drupal.TBMegaMenu.displayedMenuMobile = false;
        //   }
        //   else {
        //     $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
        //     Drupal.TBMegaMenu.displayedMenuMobile = true;
        //   }
        // });

        // Detect if the device is a touch screen.
        var isTouch = window.matchMedia('(pointer: coarse)').matches;

        if (!isTouch) {
          var mm_duration = 0;

          $('.js-dawgdrops-inner', context).each(function () {
          // $('.dawgdrops-wrapper', context).each(function () {
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });

          var mm_timeout = mm_duration ? 100 + mm_duration : 500;
          $('.nav > li, li.js-dawgdrops-item.expanded', context).bind('mouseenter', function (event) {
            showMenu($(this), mm_timeout);
          });

          $('.nav > li > .dropdown-toggle, li.js-dawgdrops-item.expanded > .js-dawgdrops-link > .dropdown-toggle', context).bind('focus', function (event) {
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

          $('.nav > li, li.js-dawgdrops-item.expanded', context).bind('mouseleave', function (event) {
            hideMenu($(this), mm_timeout);
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

          $('.nav > li > a, li.js-dawgdrops-item.expanded > .js-dawgdrops-link > a').focus(function (event) {
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
                $('.js-dawgdrops-inner').find('.js-dawgdrops-clicked').removeClass('js-dawgdrops-clicked');
                // $('.dawgdrops-wrapper').find('.dawgdrops-clicked').removeClass('dawgdrops-clicked');

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
              $('.js-dawgdrops-inner').find('.js-dawgdrops-clicked').removeClass('js-dawgdrops-clicked');
            };
          })
        };

        if (isTouch) {
          createTouchMenu($('.js-dawgdrops-nav > li.js-dawgdrops-item', context).has('ul.js-dawgdrops-menu'));
        };

        // $(window).on('load resize', function () {
        //   var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        //   if (windowWidth != Drupal.dawgDrops.oldWindowWidth) {
        //     Drupal.dawgDrops.oldWindowWidth = windowWidth;
        //     Drupal.dawgDrops.menuResponsive();
        //
        //     if (windowWidth >= Drupal.dawgDrops.supportedScreens[0]) {
        //       navParent.addEventListener('keydown',keydownEvent);
        //     }
        //     else {
        //       navParent.removeEventListener('keydown',keydownEvent);
        //     }
        //   }
        // });
        // $(window).resize(function() {
        //   var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        //   if(windowWidth != Drupal.TBMegaMenu.oldWindowWidth){
        //     Drupal.TBMegaMenu.oldWindowWidth = windowWidth;
        //     Drupal.TBMegaMenu.menuResponsive();
        //   }
        // });

      });
    },
  }
})(jQuery, Drupal, drupalSettings);
