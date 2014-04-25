
$(document).ready(function(){

/* show/hide edit bocks */
    $(document).on('click', '.edit-link', function(){
            var $editblock =$(this).parents('.hostel-block').hide().next('.hostel-block');
            var $firstfield = $editblock.find('.change-data').first();
            $editblock.show();
            $firstfield.focus();
            var value = $firstfield.val();
            $firstfield.val('');
            $firstfield.val(value);
    });

    $(document).on('click', '.save-link', function(){
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

    $(document).on('click', '.add-room-btn', function(){
        var $table = $(this).parents('.block-content').find('.rooms-description-list tbody');
        var $saveTable = $('.rooms-create-block').find('.rooms-description-list tbody');
        var i = 1;
        var randomNumber = Math.floor((Math.random()*10000)+1);
        var autoId = 'newautocheck' + i + randomNumber;
        var roomTitle = 'room-a-title' + i + randomNumber;
        var roomPeople = 'room-a-people' + i + randomNumber;
        var roomPrice = 'room-a-price' + i + randomNumber;
        var roomSquare = 'room-a-square' + i + randomNumber;
        var roomFullRent = 'room-a-full-rent' + i + randomNumber;

        $table.append(
            '<tr>' +
                '<td>' +
                    '<input class="value-field change-data title" data-classname="' + roomTitle + '" type="text" value="Имя номера">' +
                '</td>' +
                '<td>' +
                        '<input class="value-field change-data only-numbers people" data-classname="' + roomPeople + '" type="text" value="0">чел' +
                '</td>' +
                '<td>' +
                        '<input class="value-field change-data price only-numbers" type="text" data-classname="' + roomPrice + '" value="0"><span class="price_subtitle">руб/сутки</span>' +
                '</td>' +
                '<td class="checkbox-panel">' +
                    '<span class="checkbox-edit"><input class="room-rent-check" id="' +
                    autoId + '" data-classname="' + roomFullRent + '" type="checkbox"><label for="' + autoId + '"><span></span></label></span>' +
                '</td>' +
                '<td>' +
                    '<input class="value-field change-data square only-numbers" type="text" data-classname="' + roomSquare + '" value="0"> м<sup>2</sup>' +
                '</td>' +
                '<td>' +
                    '<ul class="photo-list clearfix"><div class="add-photo-button-wrap"><span class="add-photo-button"></span><input class="add-photo-field" type="file"></div>' +
                    '</li></ul>' +
                '</td>' +
            '</tr>'
        );

        $saveTable.append(
            '<tr><td><span class="title ' +
                    roomTitle +
            '">Имя номера</span></td><td><span class="people ' +
                    roomPeople +
            '">0</span> чел</td><td><span class="price ' +
                    roomPrice  +
            '">0</span><span class="price_subtitle">руб/сутки</span></td><td class=" ' +
                    roomFullRent +
            '"></td><td><span class="square ' +
                    roomSquare +
            '">0</span> м<sup>2</sup></td><td><ul class="photo-list clearfix"></ul></td></tr>'
        );

        i+=i;
    });

/* auto update data after editing */
    $(document).on('change', '.change-data', function(){
        var classname = $(this).attr('data-classname');
        var value = $(this).val();
        $("." + classname).text(value);
    });


/* remove lists items at div.places-block */
    $(document).on('click', '.remove-button', function(){$(this).parents('li').remove()});


/* add lists items at div.places-block */
    $(document).on('click', '.auto-add-wrap .add-button', function(){
        var value = $(this).prev('input').val();
        var $list = $(this).parents('.auto-add-wrap').find('.auto-add-list');
        var htmlContent = "<li>" + value + "<span class='remove-button'></span></li>";
        $list.append(htmlContent);
        $('.remove-button').on('click', function(){$(this).parents('li').remove()});
    });

    var metrocolors = ['green', 'pink', 'purple-light', 'yellow', 'purple-dark'];
    var i = 0;

    $(document).on('click', '.metro-fields .add-button', function(){
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
    $(document).on('click', '.drop-panel-button', function(){
        $('.drop-panel').hide();
        $(this).parents('.drop-panel-wrap').find('.drop-panel').show();
    });

    $('html').click(function(){
        $('.drop-panel').hide();
    });

    $(document).on('click', '.drop-panel, .drop-panel-button', function(e){
        if (!e) var e = window.event;
        e.stopPropagation();
    });

    $(document).on('click', '.select-list li', function(){
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
