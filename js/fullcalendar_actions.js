function setCellHeight(){
    var element = $('.fc-day-wrapper');
    var rowHeight = element.eq(0).width();
    element.height(rowHeight);
}

$(window).resize(function(){
    setCellHeight();
});

$(document).ready(function() {

    $('#dialogFormDateStartFormat, #dialogFormDateEndFormat').datepicker({
        dateFormat: 'yy-mm-dd'
    });

    function setDialogFormCord(num){
        //var cell = $('.fc-day.dateFix').eq(num);
        var cell = $('.fc-day.dateFix:last');
        var formTop = cell.offset().top + cell.height() + 12;
        var formLeft = cell.offset().left - (cell.width()/2)-5;
        $('#dialogForm').css('left', formLeft).css('top', formTop);
    }

    function setDialogFormValues(start, end, price){

        var startDate = new Date(start);
        var endDate = new Date(end);

        if((startDate - endDate) > 0) {
            $('#dialogFormDateStartFormat').val(start);
            $('#dialogFormDateEndFormat').val(start);
        }else{
            $('#dialogFormDateStartFormat').val(start);
            $('#dialogFormDateEndFormat').val(end);
        }

        if(isNaN(parseInt(price))) {
            $('#dialogFormPrice').val('');
        }else{
            $('#dialogFormPrice').val(parseInt(price));
        }

    }

    $('#dialogFormDateStartFormat, #dialogFormDateEndFormat').on('change', function(){

        var start = $('#dialogFormDateStartFormat').val();
        var end = $('#dialogFormDateEndFormat').val();

        selectStartDate = start;
        selectEndDate = end;

        hightlightFix(end);
        setDialogFormCord(end);
    });

    function showDialogForm(price, start, end){

        var selectedCount = 0;
        $('.fc-day').each(function(){
            if($(this).data('date') >= start && $(this).data('date') <= end){
                selectedCount ++;
            }
        });

        //setDialogFormCord(Math.round((selectedCount)/2)-1);
        setDialogFormCord(selectedCount);
        setDialogFormValues(start, end, price);
        $('#dialogForm').show();

    }

    $('#dialogFormAct .dialogFormCansel').click(function(){
        selectStartDate = '';
        selectEndDate = '';
        calendar.fullCalendar( 'unselect' );
        $('#dialogForm').hide();
    });

    $('#dialogFormAct .dialogFormSave').click(function(e){

        var startDate = new Date($('#dialogFormDateStartFormat').val());
        var endDate = new Date($('#dialogFormDateEndFormat').val());

        while(endDate.valueOf() >= startDate.valueOf()){
            var isAdd = true;
            calendar.fullCalendar('clientEvents', function (event) {

                if(startDate.valueOf() == event.start.valueOf()){
                    event.title = parseInt($('#dialogFormPrice').val()) + 'р.';
                    calendar.fullCalendar('updateEvent', event);
                    isAdd = false;
                }

            });

            if(isAdd){
                calendar.fullCalendar('renderEvent', {
                    title: parseInt($('#dialogFormPrice').val()) + 'р.',
                    start: startDate,
                    allDay: true
                });
            }

            startDate.setDate(startDate.getDate()+1);
        }

        selectStartDate = '';
        selectEndDate = '';

        calendar.fullCalendar('unselect');
        $('#dialogForm').hide();
        e.preventDefault();
    });

    //select range fix
    var selectStartDate = '';
    var selectEndDate = '';

    function selectRangeFix(date, event, element){
        if(selectStartDate == '' && selectEndDate == ''){
            selectStartDate = date.format();
            var el = $('td.fc-day[data-date="'+date.format()+'"]').addClass('startFix dateFix');
            el.next().addClass('endFix');
        }else{
            selectEndDate = date.format();
        }

        if(selectStartDate != '' && selectEndDate != ''){
            calendar.fullCalendar('unselect');
            calendar.fullCalendar('select', selectStartDate, selectEndDate);
            var price = '';
            calendar.fullCalendar('clientEvents', function (event) {
                if (event.start.format() == selectStartDate) {
                    price = event.title;
                }
            });

            hightlightFix(selectEndDate);
            showDialogForm(price, selectStartDate, selectEndDate);

            selectStartDate = '';
            selectEndDate = '';
        }

    }

    function addZero(i) {
        return (i < 10)? "0" + i: i;
    }

    function hightlightFix(end){

        if(selectStartDate != '' && end != ''){
            var start = selectStartDate;
            var startDate = new Date(start);
            var endDate = new Date(end);


            $('td.fc-day').removeClass('dateFix').removeClass('startFix').removeClass('endFix');

            if((startDate - endDate) > 0) {

                /*var startDate =  new Date(end);
                 var endDate = new Date(start);

                 while(endDate.valueOf() >= startDate.valueOf()){
                 var selectDate = startDate.getFullYear() + '-' + addZero(parseInt(startDate.getMonth())+1) + '-' + addZero(startDate.getDate());
                 $('td.fc-day[data-date="'+selectDate+'"]').addClass('dateFix');
                 startDate.setDate(startDate.getDate()+1);
                 }*/
                $('td.fc-day[data-date="'+start+'"]').next().addClass('endFix');
                //$('.dateFix:first').addClass('startFix dateFix');
                $('td.fc-day[data-date="'+start+'"]').addClass('startFix dateFix');

            }else{

                while(endDate.valueOf() >= startDate.valueOf()){
                    var selectDate = startDate.getFullYear() + '-' + addZero(parseInt(startDate.getMonth())+1) + '-' + addZero(startDate.getDate());
                    $('td.fc-day[data-date="'+selectDate+'"]').addClass('dateFix');
                    startDate.setDate(startDate.getDate()+1);
                }

                $('td.fc-day[data-date="'+start+'"]').addClass('startFix').addClass('dateFix');

                if($('.dateFix:last').index() == 6){
                    $('.dateFix:last').parents('.fc-week').next().find('td.fc-day').eq(0).addClass('endFix');
                }else{
                    $('.dateFix:last').next().addClass('endFix');
                }

            }

        }

    }

    $(document).on('mouseenter', '.fc-day', function(e){
        if(selectStartDate != '' && selectEndDate == ''){
            hightlightFix($(this).data('date'));
        }
        /*if(selectStartDate == '' && selectEndDate == ''){
            console.log('sdfsdf');
            $('td.fc-day').removeClass('dateFix').removeClass('startFix').removeClass('endFix');
            $(this).addClass('dateFix').addClass('startFix');
        }*/
    });
    //select range fix


    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв.','Фев.','Март','Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Ноя.','Дек.'],
        dayNames: ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
        dayNamesShort: ["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"],
        firstDay: 1,
        disableDragging: true,
        selectable: true,
        eventTextColor: '#fff',
        eventBackgroundColor: 'transparent',
        eventBorderColor: 'transparent',
        unselectCancel: '#dialogForm, .ui-datepicker',
        unselect: function(){
            $('#dialogForm').hide();
        },
        dayClick: function(date, jsEvent, view){
            selectRangeFix(date, jsEvent, view);
        },
        viewRender: function(view, element){
            setCellHeight();
        },
        eventRender: function(event, element){
            $('.fc-day[data-date="'+event.start.format()+'"]').find('.fc-day-content span').text(event.title);
        },
        events: [
            {
                title: '2000р.',
                start: new Date(y, m, 1),
                end: new Date(y, m, 1),
                allDay: true
            },
            {
                title: '3000р.',
                start: new Date(y, m, 2),
                end: new Date(y, m, 2),
                allDay: true
            },
            {
                title: '4000р.',
                start: new Date(y, m, 3),
                end: new Date(y, m, 3),
                allDay: true
            },
            {
                title: '1000р.',
                start: new Date(y, m, 4),
                end: new Date(y, m, 4),
                allDay: true
            },
            {
                title: '1000р.',
                start: new Date(y, m, 5),
                end: new Date(y, m, 5),
                allDay: true
            },
            {
                title: '1000р.',
                start: new Date(y, m, 6),
                end: new Date(y, m, 6),
                allDay: true
            },
            {
                title: '1000р.',
                start: new Date(y, m, 7),
                end: new Date(y, m, 7),
                allDay: true
            },
            {
                title: '1000р.',
                start: new Date(y, m, 8),
                end: new Date(y, m, 8),
                allDay: true
            },
            {
                title: '1000р.',
                start: new Date(y, m, 9),
                end: new Date(y, m, 9),
                allDay: true
            },
            {
                title: '1000р.',
                start: new Date(y, m, 10),
                end: new Date(y, m, 10),
                allDay: true
            }
        ]
    });
});

