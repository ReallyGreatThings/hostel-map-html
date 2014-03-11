
$(document).ready(function(){

/* show/hide edit bocks */
    $('.edit-link').on('click', function(){
            $(this).parents('.hostel-block').hide().next('.hostel-block').show();
    });

    $('.save-link').on('click', function(){
        $(this).parents('.hostel-block').hide().prev('.hostel-block').show();
        var lists = $('.change-data-list');
        lists.each(function(){
            var htmlCont = $(this).html();
            $("." + $(this).attr('data-classname')).html(htmlCont);
        });

        var roomCheckList = $('.room-rent-check');
        roomCheckList.each(function(){
            var $chbox = $(this);
            var $span = $("." + $chbox.attr('data-classname'))
            if($chbox.is(':checked'))       {
                $span.text('ДА');
            } else {
                $span.text('НЕТ');
            }
        });

        var servicesChekList = $('.change-services-list');
        servicesChekList.each(function(){
            var $chbox = $(this);
            var $elem = $("." + $chbox.attr('data-classname'));
            if($chbox.is(':checked')){
                $elem.show();
            } else {
                $elem.hide();
            }
        });
    });


/* auto update data after editing */
    $('.change-data').on('change', function(){
        var classname = $(this).attr('data-classname');
        var value = $(this).val();
        $("." + classname).text(value);
    });


/* remove lists items at div.places-block */
    $('.remove-button').on('click', function(){$(this).parents('li').remove()});


/* add lists items at div.places-block */
    $('.auto-add-wrap .add-button').on('click', function(){
        var value = $(this).prev('input').val();
        var $list = $(this).parents('.auto-add-wrap').find('.auto-add-list');
        var htmlContent = "<li>" + value + "<span class='remove-button'></span></li>";
        $list.append(htmlContent);
        $('.remove-button').on('click', function(){$(this).parents('li').remove()});
    });

    var metrocolors = ['green', 'pink', 'purple-light', 'yellow', 'purple-dark'];
    var i = 0;

    $('.metro-fields .add-button').on('click', function(){
        var value = $(this).prev('input').val();
        var colorclass = metrocolors[i];
        var $list = $(this).parents('.metro-fields').find('.auto-add-list');
        $list.append("<li class=" + colorclass + ">" + value + "<span class='remove-button'></span></li>");
        if (i == metrocolors.length - 1){
            i = 0
        } else {
            i = ++i;
        }
        $('.remove-button').on('click', function(){$(this).parents('li').remove()});
    });


/* drop lists and custom select */
    $('.drop-panel-button').on('click', function(){
        $('.drop-panel').hide();
        $(this).parents('.drop-panel-wrap').find('.drop-panel').show();
    });

    $('html').click(function(){
        $('.drop-panel').hide();
    });

    $('.drop-panel, .drop-panel-button').click(function(e){
        if (!e) var e = window.event;
        e.stopPropagation();
    });

    $('.select-list li').on('click', function(){
        var value = $(this)[0].innerHTML;
        $(this).parents('.drop-panel-wrap').find('.select').val(value).change();
        $('.drop-panel').hide();
    });

/* Numeric only control handler */
    jQuery.fn.ForceNumericOnly =
            function () {
                return this.each(function () {
                    $(this).keydown(function (e) {
                        var key = e.charCode || e.keyCode || 0;
                        // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
                        // home, end, period, and numpad decimal
                        return (
                            key == 8 ||
                            key == 9 ||
                            key == 46 ||
                            key == 110 ||
                            key == 190 ||
                            (key >= 35 && key <= 40) ||
                            (key >= 48 && key <= 57) ||
                            (key >= 96 && key <= 105));
                    });
                });
            };

    $(".only-numbers").ForceNumericOnly();

});
