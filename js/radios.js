/* RADIO PUBLIC CLASS DEFINITION
 * ============================== */
(function ($, Drupal, window, document) {

  $.radio = function ( element, options ) {

    var states = {
      checked  : 'checked',
      disabled : 'disabled'
    }
    , template = '<span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span>'
    // Set a variable referencing the current plugin
    , this_ = this
    // Cache the current jQuery element using the plugin
    , $element = $(element)
    , label = $(element).children('label').first()
    , input = $(label).children('input').first();

    this_.init = function() {
      $(input).after(template);
      setState();
      $(input).bind('change', toggle );
      $(input)
        .focus(function() {
          $(label).addClass('radio-focus');
        })
        .focusout(function() {
          $(label).removeClass('radio-focus');
        });
    }

    var setState = function() {
      $(input).prop( states.disabled ) && $element.addClass( states.disabled );
      $(input).prop( states.checked ) && $element.addClass( states.checked );
    };

    var getGroup = function() {
      if ($(input).attr('type') === 'radio') {
        return $(input).closest('.form-radios').children('.radio');
      }
      if ($(input).attr('type') === 'checkbox') {
        return $(input).closest('.form-checkboxes').children('.checkbox');
      }
    }

    var toggle = function(e) {
      if ($(input).attr('type') === 'radio') {
        var group = getGroup();
        $(group).each(function() { toggleCheckBox($(this)); });
      }
      else if ($(input).attr('type') === 'checkbox') {
        toggleCheckBox($element);
      }
    };

    var toggleCheckBox = function(a) {
      var t = '';
      var alabel = $(a).find('label').first()
      , ainput = $(alabel).find('input').first()
      , b = $(ainput).prop(states.checked)
      , c = $(ainput).prop(states.disabled);
        !c && $(a).removeClass(states.checked),
      c || (b && $(a).addClass(states.checked) && $(a).trigger($.Event('toggle')), 
        b !== $(a).prop(states.checked) && $(a).trigger('change'));
    };
    
    // Initialize the plugin
    this_.init();
  }

  // Set up the jQuery plugin
  $.fn.radio = function(options) {
    return this.each(function() {
      // Check if the plugin has already been initiated on the specific element
      if (undefined == $(this).data( 'radio' )) {
          var plugin = new $.radio( this, options );
          $(this).data( 'radio', plugin );
      }
    });
  }

})(jQuery, Drupal, this, this.document);
