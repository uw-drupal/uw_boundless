(function ($, Drupal, window, document, undefined) {
  UW = (typeof(UW) === 'undefined') ? {} : UW;

  UW.search = {

    el                      : '.uw-search',
    search_area             : '#uwsearcharea',
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
      this.$search_button = $(this.el);
      this.$search_area = $(this.search_area);
      this.$search_input = this.$search_area.find('input').first();
      this.$search_submit = this.$search_area.find('button').first();
      this.$screen_reader_shortcuts = $(this.screen_reader_shortcuts);
      this.$body = $(this.body);
      this.render();
      this.events();
    },

    render : function () {
      this.$search_button.attr( 'aria-controls', 'uwsearcharea' ).attr( 'aria-owns', 'uwsearcharea' );
      this.$search_input.attr( 'tabindex', -1 ).attr('autocomplete', 'off');
      this.$search_submit.attr( 'tabindex', -1 );
    },

    events : function () {
      this.$search_area.on('keydown', 'input:first', this.inner_keydown.bind(this) );
      this.$search_area.on('keyup',   'input',       this.animate.bind(this) );
      this.$search_area.on('blur',    'button:last',  this.loop.bind(this) );
      this.$search_area.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', this.transitionEnd.bind(this));
      this.$search_button.bind({
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

      this.$search_area.toggleClass('open');
      this.open = this.$search_area.hasClass('open');
      this.$body.toggleClass('search-open');

      if (!this.open) {
        this.accessible();
      }
    },

    inner_keydown : function(event) {
      if ( event.keyCode == 9 && event.shiftKey) {
        this.$search_button.focus();
        return false;
      }
    },

    transitionEnd : function (event) {
      if (this.open && event.target == this.$search_area[0]) {
        this.accessible();
      }
      this.animating = false;
    },

    accessible : function (){
      this.$search_button.attr( 'aria-expanded', this.open )
      this.$search_area.attr('aria-hidden',  ( ! this.open ).toString() )
      this.$screen_reader_shortcuts.attr('aria-hidden', this.open.toString());
      if ( this.open ) {
         this.$search_button.attr('aria-label', 'close search area');
        this.$search_input.attr( 'tabindex', 0 ).focus();
        this.$search_submit.removeAttr( 'tabindex' );
      } else {
        this.$search_button.attr('aria-label', 'open search area').focus();
        this.$search_input.attr( 'tabindex', -1 );
        this.$search_submit.attr( 'tabindex', -1 );
      }
    },

    blur : function (event) {
      if( this.open ) {
        this.$search_input.focus();
      }
    },

    loop : function (event) {
      if( this.open ) {
        this.$search_button.focus();
      }
    }
  }
})(jQuery, Drupal, this, this.document);
