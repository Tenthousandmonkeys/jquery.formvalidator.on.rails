/*
	JS Form Validation on Rails v1.0.0 (August 17, 2011) plugin for jQuery
	https://github.com/Tenthousandmonkeys/jquery.formvalidator.on.rails
	Copyright (c) 2011 Adrian Fuhrmann, aliasng@gmail.com
	http://www.tenthousandmonkeys.de/
	Dual licensed under the MIT or GPL Version 2 licenses.
*/

(function( $ ){
  $.fn.jsvalidator = function() {
     var form = this;
     form.unbind('submit').bind('submit', function(){
        $(".field_with_errors").remove();
        $(".form_success").remove();
        $.post($(this).attr('action'), $(this).serialize(),
            function(data) {
                try {
                    p = $.parseJSON(data);

                    for (var k in p) {
                      if (p.hasOwnProperty(k)) {
                          var e = form.find("*[name*='[" + k + "]']");
                          e.bind('focus.validate', function(e) {$(this).unbind(e);});
                          var error = $('<div class="field_with_errors">' + k + " " + p[k] + '</div>');
                          e.before(error);
                          var offset = e.offset();
                          error.width(e.outerWidth()).height(e.outerHeight()).offset({top: offset.top, left: offset.left});
                          error.css('background', e.css('background'));
                          error.css('background-color', e.css('background-color'));
                          error.css('color', e.css('color'));
                      }
                    }

                    $(".field_with_errors").unbind('click').bind('click', function(){
                        $(this).next().trigger('focus');
                        $(this).fadeOut();
                    });

                    $(".field_with_errors").fadeIn();
                }
                catch(error)
                {
                    var success = $('<div class="form_success">' + data + '</div>');
                    form.after(success);
                    var offset = form.offset();
                    success.width(form.outerWidth()).height(form.outerHeight()).offset({top: offset.top, left: offset.left});
                    success.css('background', form.css('background'));
                    success.css('background-color', form.css('background-color'));
                    success.css('color', form.css('color'));

                    $(".form_success").unbind('click').bind('click', function(){
                        $(this).next().trigger('focus');
                        $(this).fadeOut();
                    });
                    form[0].reset();
                    $(".form_success").fadeIn();
                }

        });
        return false;
    });
  };
})( jQuery );




