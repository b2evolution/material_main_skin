(function($) {
    'use strict';


    element_click($('.loadimg'));

    element_click($('.user_link'));

    element_click($('.profile_buttons .btn'));


     /* Click events setup */

    function element_click(e) {

        var element = e;

        $(element).on("mousedown", function(c) {
            var e = $(this).parent();

            create_svg(e, c);

        });

        $(element).on("mouseup", function(c) {
            var e = $(this).parent();
            hide_svg(e, c);
            setTimeout(function() {
                $(e).find('svg').detach();
            }, 200);
        });

        $(element).on("mouseleave", function(c) {
            var e = $(this).parent();
            hide_svg(e, c);
            setTimeout(function() {
                $(e).find('svg').detach();
            }, 200);
        });

    }



    /* Create circle in svg to its parent */

    function create_svg(e, c) {

        var box = $(e);

        var setX = parseInt(c.pageX - $(e).offset().left);
        var setY = parseInt(c.pageY - $(e).offset().top);
        var radius = $(box).outerWidth() / 2;
        
        /* Create circle */
        if ($(box).find("svg").length === 0) {
            $(box).append('<svg><circle class="circle-1" cx="' + setX + '" cy="' + setY + '" r="' + (radius - 10) + '"></circle></svg>');
        }

        $(box).find('svg').css('opacity', '0.2');
        $(box).find('svg').animate({opacity: '0.8'}, {duration: 200, queue: false});
        var c1 = $(box).find(".circle-1");

        c1.attr('cx', setX);
        c1.attr('cy', setY);

        var start_r = radius;
        
        /* Start animation of circle */

        $(c1).animate({"r": radius}, {duration: 350,
            step: function(val) {
                c1.attr("r", (val + start_r));
            }
        });
        
    }
    
    /* End animation of circle */

    function hide_svg(e, c) {
        var box = $(e);
        $(box).find('svg').animate({opacity: '0'}, {duration: 200, queue: false, complete: function() {
            }
        });
    }



    /* Creating 3 columns (Info section) in secondary area with description, calendar and profile link widgets */
    
    $('.main.footer').ready(function() {

        var secondary = $('.main.footer .col-md-12:first-child');

        var evo_Calr = $(secondary).find('.widget_plugin_evo_Calr');

        var longdesc = $(secondary).find('.widget_core_coll_longdesc');

        var menu_link = $(secondary).find('.widget_core_profile_menu_link');

        if ($(secondary).find('.info_section').size() < 1) {
            $(secondary).prepend('<div class="info_section"></div>');
        }

        $('.info_section').append($(menu_link).detach());
        $('.info_section').append($(longdesc).detach());
        $('.info_section').append($(evo_Calr).detach());


    });




    /* Identify widget with lists in secondary area */
    
    $('.main.footer .widget').each(function(e) {

        if ($(this).find('ul').size() > 0 && $(this).find('.page-header').size() > 0) {
            var widget_list = $(this);

            $(widget_list).addClass('secondary_area');
        }

    });



    /* Search widget label animation */
    
    $('.main .widget_core_coll_search_form').ready(function() {

        $('.main .widget_core_coll_search_form form input[type=text]').focusin(function() {
            $('.main .widget_core_coll_search_form h2.page-header').addClass('label-hide');
        });

        if ($('.main .widget_core_coll_search_form form input[type=text]').val().length < 1) {
            $('.main .widget_core_coll_search_form h2.page-header').removeClass('label-hide');
        }

        $('.main .widget_core_coll_search_form form input[type=text]').focusout(function() {

            if ($(this).val().length < 1) {
                $('.main .widget_core_coll_search_form h2.page-header').removeClass('label-hide');
            }
        });

    });



    /* Lists setup in main area */

    var view_container = $('.view-container');

    $('.main .front_main_area .widget').each(function(e) {

        if ( $(this).hasClass( 'widget_core_coll_category_list' ) ||
              $(this).hasClass( 'widget_core_coll_link_list' ) ||
               $(this).hasClass( 'widget_core_coll_comment_list' ) ) {

            var widget_list = $(this);



            $(widget_list).addClass('widget_list');


            var widget_list_view = $(widget_list).clone();
            
            $(widget_list_view).find('h2').append('<span class="close-trigger"></span>');


            $(view_container).children('.container').append(widget_list_view);

            $(view_container).css('height', $('body').outerHeight());



            $(widget_list).find('h2').append('<span class="list-icon"><i class="fa fa-angle-down"></i></span>');




            if ($(widget_list).parent().find('.widget_lists_container').size() < 1) {

                $(widget_list).parent().append('<div class="widget_lists_container widget"></div>');
            }

            $(widget_list).find('h4').detach();
            $(widget_list).find('ul').detach();

            $(widget_list).addClass('animate');

            $('.widget_lists_container').append($(widget_list).detach());





            var pTop = $(widget_list).parent().offset().top;
            var mTop = $(widget_list).offset().top - pTop;

            var pLeft = $(widget_list).parent().offset().left;
            var mLeft = $(widget_list).offset().left - pLeft;


            $(widget_list).css({
                'top': mTop + 'px',
                'left': mLeft + 'px'
            });

            setTimeout(function() {
                $(widget_list).css({
                    'position': 'absolute'
                });
            }, 200);

        }

    });


    var list_title = $('.main .widget_lists_container .widget_list h2');

    var close_trigger = $('.close-trigger');
    
    var current_list;

    
    /* Open list in a popover view */

    $(list_title).on("click", function(c) {

        var e = $(this);

        create_svg(e, c);

        $(e).addClass('shadow');

        setTimeout(function() {
            hide_svg(e, c);
        }, 200);


        $(view_container).addClass('show');

        var view_index = $(e).parent().index();

        console.log('view index:' + view_index);

        var widget_list_view = $(view_container).children().children().eq(view_index);


        $(widget_list_view).addClass('show');

        current_list = $(widget_list_view);

        //$(widget_list_view).css({'max-height': '7000px'});



    });

    /* Close list in popover view */
    
    $(close_trigger).on("click", function(c) {
        $(view_container).removeClass('show');

        $(current_list).removeClass('show');
        
        console.log('close');
    });























})(jQuery);