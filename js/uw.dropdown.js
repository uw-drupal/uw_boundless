// Drupal.dawgDrops = Drupal.dawgDrops || {};

(function ($, Drupal, drupalSettings) {
  "use strict";
  Drupal.dawgDrops = Drupal.dawgDrops || {};
  // UW = (typeof(UW) === 'undefined') ? {} : UW;
  // Drupal.dawgDrops.oldWindowWidth = 0;
  Drupal.dawgDrops.displayedMenuMobile = false;
  // Drupal.dawgDrops.supportedScreens = [767];
  // Drupal.dawgDrops.focusableElements = 'a:not([disabled]), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), details:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

  // Drupal.dawgDrops.focusNextPrevElement = function (direction) {
  //   // Add all the elements we want to include in our selection
  //   var $current = $(document.activeElement);
  //
  //   if ($current.length) {
  //     var $focusable = $(Drupal.dawgDrops.focusableElements).filter(function () {
  //       var $this = $(this);
  //       return $this.closest('.dawgdrops-menu').length === 0 && $this.is(':visible');
  //     })
  //
  //     var index = $focusable.index($current);
  //     if (index > -1) {
  //       if (direction === 'next') {
  //         var nextElement = $focusable[index + 1] || $focusable[0];
  //       }
  //       else {
  //         var nextElement = $focusable[index - 1] || $focusable[0];
  //       }
  //
  //       nextElement.focus();
  //     }
  //   }
  // }

  Drupal.behaviors.dawgDrops = {
  // UW.dawgDrops = {

    // nav      : '.dawgdrops-nav',
    // topLevel : '.dawgdrops-nav > .dawgdrops-item',
    // submenu  : '.dawgdrops-menu',

    attach : function (context, settings) {
      // var $nav = $(this.nav);
      /* Keyboard Control Setup */
      // Semi-Global Variables
      // $nav.once('dawgdrops', function() {

      $('#dawgdrops .dawgdrops-wrapper'/*, context*/).once('dawgdrops-wrapper').each(function() {

        var navParent = document.querySelector('.dawgdrops-wrapper');
          // linkArray = new Array(),
          // curPos = new Array(-1,-1,-1);

        // Each Top-Level Link
        // $(this).find('.dawgdrops-nav > .dawgdrops-item').children('a').each(function(i, toplink) {
        //   linkArray[i] = new Array();
        //
        //   // Add Link to Array
        //   linkArray[i][-1] = toplink;
        //
        //   // Determine Coordinates
        //   $(toplink).data({ coordinate: [i, -1] });

          // Each Column
          // $(toplink).next().children().children().children('.mega-col-nav').each(function(j,column) {
          //   linkArray[i][j] = new Array();
          //
          //   // Each Link
          //   $(column).find('a').each(function(k,sublink) {
          //
          //     // Add Link to Array
          //     linkArray[i][j][k] = sublink;
          //
          //     // Determine Coordinates
          //     $(sublink).data({ coordinate: [i, j, k] });
          //   }); // each link
          //
          // }); // each column

        // }); // each top-level link

        // Update Position on Focus
        // $(this).find(Drupal.dawgDrops.focusableElements).focus(function () {
        //   curPos = $(this).data('coordinate');
        // });

        /* Event Listener */
        // On Keydown
        if (navParent !== null) {
          navParent.addEventListener('keydown', keydownEvent);
        }

        // Key Pressed
        function keydownEvent(k) {
          // Determine Key
          switch(k.keyCode) {

            // TAB
            // case 9:
            //   k.preventDefault();
            //   nav_tab(k);
            //   break;

            // RETURN
            // case 13:
            //   nav_open_link();
            //   break;

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

            // HOME
            // case 36:
            //   nav_home();
            //   break;
            //
            // // END
            // case 35:
            //   nav_end();
            //   break;

            // Else
            default:
              // Do nothing

          } // determine key
        } // keydownEvent

        /* Keypress Functions */
        // Tab
        // function nav_tab(k) {
        //   if (nav_is_toplink()) {
        //     if (k.shiftKey) {
        //       nav_prev_toplink();
        //     }
        //     else {
        //       nav_next_toplink();
        //     }
        //   }
        //   else {
        //     if (k.shiftKey) {
        //       nav_up();
        //     }
        //     else {
        //       nav_down();
        //     }
        //   }
        // }

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
          // if (!nav_is_toplink(k) || nav_is_first(k)) {
            // On a top-level item or the first submenu item, go to the previous
            // top-level item.
            nav_prev_toplink(k);
          // }
          // else {
          //   // On other submenu items, go to the previous sibling.
          //   $(k.target).parent().prev().children('a').first().focus();
          // }
        }

        // Right
        function nav_right(k) {
          // if (!nav_is_last(k)) {
            nav_next_toplink(k);
          // }
          // else {
          //   $( k.target ).parent().next().children('a').first().focus();
          // }
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
            $(k.target).parent().prev().children('a').first().focus();
          }
        }

        // Down
        function nav_down(k) {
          if (nav_is_toplink(k)) {
            // Go to the first submenu item, if one exists. Do nothing if there
            // is no submenu.
            if (nav_has_submenu(k)) {
              // On a top-level item, go to first submenu item.
              // var first_child = $(k.target).siblings('ul.dawgdrops-menu').find('a').first();
              $(k.target).siblings('ul.dawgdrops-menu').find('a').first().focus();
            }
            // $(k.target).find('ul.dawgdrops-menu').find('a').first().focus();
            // nav_first_sublink(k);
          }
          else if (nav_is_last(k)) {
            // On the last submenu item, go back to the first.
            nav_first_sublink(k);
          }
          else {
            // On other submenu items, go to the next sibling.
            $(k.target).parent().next().children('a').first().focus();
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
          return $(k.target).parent('li.dawgdrops-item').parent('ul').hasClass('dawgdrops-nav');
        }
        function nav_has_submenu(k) {
          return $(k.target).hasClass('dropdown-toggle');
        }
        function nav_is_first(k) {
          return $(k.target).parent('li.dawgdrops-item').hasClass('first');
        }

        function nav_is_last(k) {
          return $(k.target).parent('li.dawgdrops-item').hasClass('last');
        }

        function nav_first_sublink(k) {
          $(k.target).parents('ul.dawgdrops-menu').find('li.first').children('a').first().focus();
        }

        // Close all submenus
        function nav_close_submenus() {
          $('.dawgdrops-nav .open').removeClass('open');
          ariaCheck();
        }

        // Next Toplink
        function nav_next_toplink(k) {
          $(k.target).parents('.dawgdrops-nav > .dawgdrops-item').next().children('a').first().focus();
          nav_close_submenus();
          // if (linkArray[curPos[0] + 1]) {
          //   linkArray[curPos[0] + 1][-1].focus();
          // }
          // else {
          //   nav_close_submenus();
          //
          //   // Focus on the next element.
          //   Drupal.dawgDrops.focusNextPrevElement('next');
          // }
        }
        // function nav_has_next_toplink(topLink) {
        //
        // }
        // Previous Toplink
        // function nav_prev_toplink() {
        //   if (linkArray[curPos[0] - 1]) {
        //     linkArray[curPos[0] - 1][-1].focus();
        //   }
        //   else {
        //     // Focus on the previous element.
        //     Drupal.dawgDrops.focusNextPrevElement('prev');
        //   }
        // }


        function nav_prev_toplink(k) {
          $(k.target).parents('.dawgdrops-nav > .dawgdrops-item').prev().children('a').first().focus();
          nav_close_submenus();
        }

        // Previous Column
        // function nav_prev_column() {
        //   if (linkArray[curPos[0]][curPos[1] - 1][0]) {
        //     linkArray[curPos[0]][curPos[1] - 1][0].focus();
        //   }
        //   else {
        //     nav_parent_toplink();
        //   }
        // }

        // Go to Parent Toplink
        function nav_parent_toplink(k) {
          // linkArray[curPos[0]][-1].focus();
          $(k.target).parents('.dawgdrops-item.dropdown').children('a').first().focus();
        }

        var ariaCheck = function () {
          $('.dawgdrops-nav > li.dawgdrops-item', this).each(function () {
            if ($(this).is('.dropdown')) {
              // Mega menu item has dropdown (it's a flyout menu)
              if (!$(this).is('.open')) {
                // Mega menu item has dropdown class and is closed, so apply appropriate ARIA attributes
                $(this).children().attr('aria-expanded', 'false');
              }
              else if ($(this).is('.open')) {
                // Mega menu item has dropdown class and is open, so apply appropriate ARIA attributes
                $(this).children().attr('aria-expanded', 'true');
              }
            }
            else {
              // Mega menu item is neither a mega or dropdown class, so remove ARIA attributes (it doesn't have children)
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

          $('.dawgdrops-wrapper', context).each(function () {
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });

          var mm_timeout = mm_duration ? 100 + mm_duration : 500;
          $('.nav > li, li.dawgdrops-item.expanded', context).bind('mouseenter', function (event) {
            showMenu($(this), mm_timeout);
          });

          $('.nav > li > .dropdown-toggle, li.dawgdrops-item.expanded > .dropdown-toggle', context).bind('focus', function (event) {
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

          $('.nav > li, li.dawgdrops-item.expanded', context).bind('mouseleave', function (event) {
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
            if (!$(this).parent().hasClass('dawgdrops-item') && !$(this).parents('#dawgdrops').length) {
              nav_close_submenus();
            }
          });

          $('.nav > li > a, li.dawgdrops-item.expanded > a').focus(function (event) {
            // Remove all occurrences of "open" from other menu trees
            var siblings = $(this).parents('.dawgdrops-item').siblings();
            // var siblings = $(this).closest('.tb-megamenu-item.level-1').siblings();
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
            if ($(this).next(".dawgdrops-submenu").length > 0) {
              if (!$(this).parent().hasClass("open")) {
                $(this).parent().addClass("open");
              }
            }
            // If the anchor's top-level parent is not open, open it
            if (!$(this).closest('.dawgdrops-item.dropdown').hasClass('open') && $(this).closest('.dawgdrops-item.dropdown').find('.dawgdrops-menu').length > 0) {
              $(this).closest('.dawgdrops-item.dropdown').addClass('open');
              ariaCheck();
            }
            // If anchor's parent submenus are not open, open them
            var parents = $(this).parents('.dawgdrops-item.dropdown-submenu');
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
              if ($item.hasClass('dawgdrops-clicked')) {
                var $uri = $item.attr('href');

                // If the menu link has a URI, go to the link.
                // <nolink> menu items will not have a URI.
                if ($uri) {
                  window.location.href = $uri;
                }
                else {
                  $item.removeClass('dawgdrops-clicked');
                  hideMenu(dditem, mm_timeout);
                }
              }
              else {
                event.preventDefault();

                // Hide any already open menus.
                nav_close_submenus();
                $('.dawgdrops-wrapper').find('.dawgdrops-clicked').removeClass('dawgdrops-clicked');

                // Open the submenu.
                $item.addClass('dawgdrops-clicked');
                showMenu(dditem, mm_timeout);
              }
            });
          });

          // Anytime there's a click outside the menu, close the menu.
          $(document).on('click', function (event) {
            if ($(event.target).closest('.dawgdrops-nav').length === 0) {
              nav_close_submenus();
              $('.dawgdrops-wrapper').find('.dawgdrops-clicked').removeClass('dawgdrops-clicked');
            };
          })
        };

        if (isTouch) {
          createTouchMenu($('.dawgdrops-nav > li.dawgdrops-item', context).has('ul.dawgdrops-menu'));
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

    // mobilemenu_ul           : '.uw-mobile-menu',
    // toggle_button           : '.uw-mobile-menu-toggle',

    // initialize : function() {
    //   this.nav = $(this.nav);
    //   // this.$mobilemenu_ul = $(this.mobilemenu_ul);
    //   // this.$toggle_button = $(this.toggle_button);
    //   // this.cloneMenuAnchors();
    //   // this.removeDawgdrops();
    //   this.events();
    //
    // },

    // focusNextPrevElement : function (direction) {
    //   // Add all the elements we want to include in our selection
    //   var focusableElements = 'a:not([disabled]), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), details:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    //   var $current = $(document.activeElement);
    //
    //   if ($current.length) {
    //     var $focusable = $(focusableElements).filter(function() {
    //       var $this = $(this);
    //       return $this.closest('.dawgdrops-menu').length === 0 && $this.is(':visible');
    //     })
    //
    //     var index = $focusable.index($current);
    //     if (index > -1) {
    //       if (direction === 'next') {
    //         var nextElement = $focusable[index + 1] || $focusable[0];
    //       }
    //       else {
    //         var nextElement = $focusable[index - 1] || $focusable[0];
    //       }
    //
    //       nextElement.focus();
    //     }
    //   }
    // },
    // navTopFocus : function(e) {
    //   var $this = $(this);
    //   var $subMenu = $this.closest('li');
    //   showMenu($subMenu);
    //   // If the focus moves outside of the subMenu, close it.
    //   $(document).bind('focusin', function (event) {
    //     if ($subMenu.has(event.target).length) {
    //       return;
    //     }
    //     $(document).unbind(event);
    //     // console.log("hideMenu call");
    //     hideMenu($subMenu, mm_timeout);
    //   });
    // },
    // events : function () {
    //   this.nav.find('li.dawgdrops-item').bind('focus', this.toggle.bind(this));
    //   this.$mobilemenu_ul.bind('click', this.openmenu.bind(this));
    // },
  }
})(jQuery, Drupal, drupalSettings);
