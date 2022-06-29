(function ($, Drupal, window, document, undefined) {
  UW = (typeof(UW) === 'undefined') ? {} : UW;

  UW.mobileMenu = {

    el                      : '#mobile-relative',
    mobilemenu_ul           : '.uw-mobile-menu',
    toggle_button           : '.uw-mobile-menu-toggle',

    initialize : function() {
      this.$el = $(this.el);
      this.$mobilemenu_ul = $(this.mobilemenu_ul);
      this.$toggle_button = $(this.toggle_button);
      this.cloneMenuAnchors();
      this.removeDawgdrops();
      this.events();
    },

    // Clone the first item in the menu if it has a flyout, as it can't be used as both an anchor and button
    cloneMenuAnchors : function() {
      this.$el.find('.menu-item-has-children > a').one(function(){
        var $target   = $(this),
            $targetUl = $target.next('ul')

        $target.next('ul').first().prepend('<li>' + $target[0].outerHTML + '</li>');

        // Initial ARIA tags
        $target.attr('aria-expanded', false);
        $targetUl.attr('aria-hidden', true)
      })
    },

    // template.php themes the main menu items and adds the class
    // 'dawgdrops-item'. Instead of rewriting that function, we're being lazy
    // and removing the class here.
    removeDawgdrops : function() {
      this.$el.find('.dawgdrops-item').each(function() {
        $(this).removeClass('dawgdrops-item');
      });
    },

    openmenu : function(event) {
      var $target = $(event.target),
          $targeUl = $target.next();

      if( $targeUl.length > 0 ){
        event.preventDefault();
        // Toggle ARIA tags
        $targeUl.attr('aria-hidden', function(index, attr){
          return attr === 'true' ? 'false' : 'true';
        });
        $target.attr('aria-expanded', function(index, attr){
          return attr === 'true' ? 'false' : 'true';
        });
        $target.parent().toggleClass('active-menu');
      }
    },

    toggle: function(event) {
      this.$mobilemenu_ul.toggle();
      this.$el.addClass('active_nav');
      this.cloneMenuAnchors();
    },

    reset_li: function() {
      this.$mobilemenu.find('li').removeAttr('style');
    },

    events : function () {
      this.$toggle_button.bind('click', this.toggle.bind(this));
      this.$mobilemenu_ul.bind('click', this.openmenu.bind(this));
    },
  }
})(jQuery, Drupal, this, this.document);
