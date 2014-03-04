$(document).ready(function(){
    $(".searchMap, .searchResult").css("height", parseInt($(window).height()) - 58);
});

$(window).resize(function(){
    $(".searchMap, .searchResult").css("height", parseInt($(window).height()) - 58);
});

$("#searchResultWrapper").scroll(function(){

    $('.searchResultOther.active, .searchMapSelect').removeClass('active');
    $( "#dateMin, #dateMax" ).datepicker( "hide" );

    if($(this).scrollTop() > 235){
        $('body').addClass('stick');
    }else{
        $('body').removeClass('stick');
    }

});

$(function() {
    $( "#slider-price" ).slider({
        range: true,
        min: 0,
        max: 10000,
        values: [ 2800, 6500 ],
        slide: function( event, ui ) {
            $( "#price" ).val( + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            $("#priceMin .searchResultSliderValue").text(ui.values[ 0 ]);
            $("#priceMax .searchResultSliderValue").text(ui.values[ 1 ]);
        }
    });

    $("#slider-price").find(".ui-slider-handle").eq(0).attr("id", "priceMin").append($('<span />').addClass('searchResultSliderValue'));
    $("#slider-price").find(".ui-slider-handle").eq(1).attr("id", "priceMax").append($('<span />').addClass('searchResultSliderValue'));

    $("#priceMin .searchResultSliderValue").text($( "#slider-price" ).slider( "values", 0 ));
    $("#priceMax .searchResultSliderValue").text($( "#slider-price" ).slider( "values", 1 ));

    $( "#price" ).val( $( "#slider-price" ).slider( "values", 0 ) + " - " + $( "#slider-price" ).slider( "values", 1 ) );

    $( "#slider-count" ).slider({
        min: 1,
        max: 10,
        value: 2,
        slide: function( event, ui ) {
            $( "#count" ).val( ui.value );
            $( "#countVal .searchResultSliderValue" ).text( ui.value );
        }
    });
    $("#slider-count").find(".ui-slider-handle").attr("id", "countVal").append($('<span />').addClass('searchResultSliderValue'));

    $("#count").val( $( "#slider-count" ).slider( "value" ) );
    $("#countVal .searchResultSliderValue").text( $( "#slider-count" ).slider( "value" ) );


    $("#dateMin").datepicker({

    });

    $("#dateMax").datepicker({

    });

    $('.searchResultDatepickerWrapper').click(function(){
        $(this).find('input').focus();
    });

    $('.searchResultOther span').click(function(){
        $(this).parent().toggleClass('active');
    });

    $('.searchResultItem').click(function(){
        location.href = $(this).data('url');
    });

    $('.searchResultOtherFilterCheck').on('click', $('.searchResultOtherFilterCheck'), function(e){
        var checkbox = $(this).find('input[type="checkbox"]');
        if(checkbox.attr("checked") == 'checked'){
            $(this).removeClass('active');
            checkbox.removeAttr('checked');
        }else{
            $(this).addClass('active');
            checkbox.attr('checked', true);
        }
        e.preventDefault();
    });

    $(".searchResultItemSlides").slidesjs({
        pagination: {
            active: false
        }
    });

    $('.slidesjs-navigation').click(function(e){
        e.preventDefault();
        return false;
    });

    (function(){
        $('.searchResultItemRating').each(function(){

            var rating = $(this).data('rating');
            var stars = '';
            for(i=1; i<6; i++){
                if(i<=rating){
                    stars += '<li class="active"></li>';
                }else{
                    stars += '<li></li>';
                }
            }
            $(this).append($('<ul />').addClass('searchResultItemRatingStars clearfix').html(stars));

        });

    })();

    $('.searchMapSelect span').click(function(){
        $('.searchMapSelect').not($(this).parents('.searchMapSelect')).removeClass('active');
        $(this).parents('.searchMapSelect').toggleClass('active');

    });

    $('.searchMapSelect li').click(function(){
        var valText = $.trim($(this).text());
        var value = $.trim($(this).data('value'));
        $(this).parents('.searchMapSelect').find('span').text(valText);
        $(this).parents('.searchMapSelect').find('input').val(value);
        $(this).parents('.searchMapSelect').removeClass('active');
    });

});

//loader image
/*var cSpeed=9;
var cWidth=50;
var cHeight=50;
var cTotalFrames=12;
var cFrameWidth=50;
var cImageSrc='http://test.htmlcenter.by/hoselmap/img/sprites.png';
var cImageTimeout=false;
var cIndex=0;
var cXpos=0;
var cPreloaderTimeout=false;
var SECONDS_BETWEEN_FRAMES=0;

function startAnimation(){

    document.getElementById('loaderImage').style.backgroundImage='url('+cImageSrc+')';
    document.getElementById('loaderImage').style.width=cWidth+'px';
    document.getElementById('loaderImage').style.height=cHeight+'px';

    FPS = Math.round(100/cSpeed);
    SECONDS_BETWEEN_FRAMES = 1 / FPS;

    cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES/1000);

}

function continueAnimation(){

    cXpos += cFrameWidth;
    cIndex += 1;

    if (cIndex >= cTotalFrames) {
        cXpos =0;
        cIndex=0;
    }

    if(document.getElementById('loaderImage'))
        document.getElementById('loaderImage').style.backgroundPosition=(-cXpos)+'px 0';

    cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES*1000);
}

function stopAnimation(){
    clearTimeout(cPreloaderTimeout);
    cPreloaderTimeout=false;
}

function imageLoader(s, fun)
{
    clearTimeout(cImageTimeout);
    cImageTimeout=0;
    genImage = new Image();
    genImage.onload=function (){cImageTimeout=setTimeout(fun, 0)};
    genImage.onerror=new Function('alert(\'Could not load the image\')');
    genImage.src=s;
}

new imageLoader(cImageSrc, 'startAnimation()');*/
