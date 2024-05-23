(function ($, Drupal, window, document, undefined) {
  UW = (typeof(UW) === 'undefined') ? {} : UW;

  UW.search = {
    
    el                      : '.uw-search',
    search                  : '#uwsearcharea',
    screen_reader_shortcuts : '.screen-reader-shortcut',
    body                    : 'body',
    open                    : false,
    animating               : false,

    initialize : function (options) {
      if (typeof(options) === 'object'){
        for (var key in options){
          if (options.hasOwnProperty(key) && this.hasOwnProperty(key)){
            if (typeof(this.key) === 'string') {
              this[key] = options[key];
            }
          }
        }
      }
      this.$el = $(this.el);
      this.$search = $(this.search);
      this.$screen_reader_shortcuts = $(this.screen_reader_shortcuts);
      this.$body = $(this.body);
      this.render();
      this.events();
    },

    render : function () {
      this.$el.attr( 'aria-controls', 'uwsearcharea' ).attr( 'aria-owns', 'uwsearcharea' );
    },

    events : function () {
      this.$search.on('keydown', 'input:first', this.inner_keydown.bind(this) );
      this.$search.on('keyup',   'input',       this.animate.bind(this) );
      this.$search.on('blur',    'button:last',  this.loop.bind(this) );
      this.$search.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', this.transitionEnd.bind(this));
      this.$el.bind({
        click      : this.animate.bind(this),
        touchstart : this.animate.bind(this),
        keyup      : this.animate.bind(this),
        blur       : this.blur.bind(this),
      }); 
    },
    
    animate : function ( event ) {
      event.preventDefault();

      if (this.animating || (event.keyCode && $.inArray(event.keyCode, [ 27 , 13 ]) == -1)){
        return false;
      }

      this.animating = true;
      this.$search.toggleClass('open');
      this.$body.toggleClass('search-open');
      this.open = this.$search.hasClass('open');

      if (!this.open) {
        this.accessible();
      }
    },

    inner_keydown : function(event) {
      if ( event.keyCode == 9 && event.shiftKey) {
        this.$el.focus();
        return false;
      }
    },

    transitionEnd : function (event) {
      if (this.open && event.target == this.$search[0]) {
        this.accessible();
      }
      this.animating = false;
    },

    accessible : function (){
      this.$el.attr( 'aria-expanded', this.open )
      this.$search.attr('aria-hidden',  ( ! this.open ).toString() )
      this.$screen_reader_shortcuts.attr('aria-hidden', this.open.toString());
      if ( this.open ) {
         this.$el.attr('aria-label', 'Close search area');
         this.$search.find('input').attr( 'tabindex', 0 ).first().focus()
      } else {
         this.$el.attr('aria-label', 'Open search area');
         this.$search.find('input').attr( 'tabindex', -1 )
         this.$el.focus()
      }
    },

    blur : function (event) {
      if( this.open ) {
        this.$search.find('input').first().focus();
      }
    },

    loop : function (event) {
      if( this.open ) {
        this.$el.focus();
      }
    }
  }
})(jQuery, Drupal, this, this.document);
