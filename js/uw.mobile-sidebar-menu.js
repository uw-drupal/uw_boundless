(function ($, Drupal, window, document, undefined) {
  UW = (typeof(UW) === 'undefined') ? {} : UW;

  UW.mobileSidebarMenu = {
    
    el                      : '#mobile-sidebar',
    toggle_button           : '#mobile-sidebar-menu',
    title                   : '#mobile-sidebar-title',
    links                   : '#mobile-sidebar-links',

    initialize : function() {
      this.$el = $(this.el);
      this.$toggle_button = $(this.toggle_button);
      this.$title = $(this.title);
      this.$links = $(this.links);
      this.toggleContent();
      this.events();
    },  

    toggleContent: function(e){
      if (this.showmeState === true) {
        this.hideLinks();
      } else {
        this.showLinks();
      }
    },

    hideLinks: function() {
      this.$links.removeClass('visible-xs');
      this.$toggle_button.removeClass('open');
      this.$title.html('Open Menu');
      this.showmeState = false; 

    },
    showLinks: function() {
      this.$links.addClass('visible-xs');
      this.$toggle_button.addClass('open');
      this.$title.html('Close Menu');
      this.showmeState = true;

    },

    events : function () {
      this.$toggle_button.bind({
        click      : this.toggleContent.bind(this),
      }); 
    },
  }
})(jQuery, Drupal, this, this.document);
