(function($) {
    'use strict';


    element_click($('.loadimg'));

    element_click($('.user_link'));

    element_click($('.profile_buttons .btn'));

    element_click($('.widget_core_coll_common_links ul li strong a'));


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

    function create_svg(e, c, x, y, d) {



        var box = $(e);

        var setX = parseInt(c.pageX - $(e).offset().left);
        var setY = parseInt(c.pageY - $(e).offset().top);
        var radius = $(box).outerWidth() / 2;

        var radiusMax = Math.max(parseInt($(box).outerWidth()), parseInt($(box).outerHeight()));



        if (x > 0 || y > 0) {
            setX = x;
            setY = y;
        }
        if (d < 1) {
            d = 350;
        }

        var start_r = radiusMax * 0.4;

        /* Create circle */
        if ($(box).find("svg").length === 0) {
            $(box).append('<svg><circle class="circle-1" cx="' + setX + '" cy="' + setY + '" r="' + (start_r) + '"></circle></svg>');
        }

        $(box).find('svg').css('opacity', '0.2');
        $(box).find('svg').animate({opacity: '1'}, {duration: 200, queue: false});
        var c1 = $(box).find(".circle-1");

        c1.attr('cx', setX);
        c1.attr('cy', setY);

        c1.attr('r', start_r);

        /* Start animation of circle */

        $(c1).animate({"r": radiusMax}, {duration: d,
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



    /* Social Icons Setup */

    $('.widget--social-media-links a').each(function() {

        var mthis = $(this);

        var class_attr = $(mthis).attr('class');

        $(mthis).children('span').addClass(class_attr);

    });



    /* Identify widget with lists in secondary area */

    $('.main.footer .widget').each(function(e) {

        if ($(this).find('ul').size() > 0 && $(this).find('.page-header').size() > 0) {
            var widget_list = $(this);

            $(widget_list).addClass('secondary_area');
        }

    });



    /* Search widget label animation */

    $('.widget_core_coll_search_form').ready(function() {

        $('.widget_core_coll_search_form form input[type=text]').focusin(function() {
            $('.widget_core_coll_search_form h2').addClass('label-hide');
        });

        if ($('.widget_core_coll_search_form form input[type=text]').val().length < 1) {
            $('.widget_core_coll_search_form h2').removeClass('label-hide');
        }

        $('.widget_core_coll_search_form form input[type=text]').focusout(function() {

            if ($(this).val().length < 1) {
                $('.widget_core_coll_search_form h2').removeClass('label-hide');
            }
        });

    });



    /* Lists setup in main area */

    var view_container = $('.view-container');

    $('.main .front_main_area .widget[class$="list"]').each(function(e) {

       /* if ($(this).hasClass('widget_core_coll_category_list') ||
                $(this).hasClass('widget_core_coll_link_list') ||
                $(this).hasClass('widget_core_coll_comment_list')) {
            
            */
           

            var widget_list = $(this);


            $(widget_list).addClass('widget_list');

            $(widget_list).attr('data-index', e);


            var widget_list_view = $(widget_list).clone();

            $(widget_list_view).find('h2').append('<span class="close-trigger"></span>');

            var list_content = $(widget_list_view).children().detach();
            $(widget_list_view).append('<div class="list-container content"></div>');

            $(widget_list_view).find('.list-container').append(list_content);


            $(view_container).children('.container').append(widget_list_view);

            $(view_container).css('height', $('body').outerHeight());





            $(widget_list).find('h2').append('<span class="list-icon"><i class="fa fa-angle-right"></i></span>');

            

            $(widget_list).find('h4').detach();
            $(widget_list).find('ul').detach();

            $(widget_list).addClass('animate');

            

            /* 
            var pTop = $(widget_list).parent().offset().top;
            var mTop = $(widget_list).offset().top - pTop;

            var pLeft = $(widget_list).parent().offset().left;
            var mLeft = $(widget_list).offset().left - pLeft;

          $(widget_list).css({'top': mTop + 'px', 'left': mLeft + 'px'});
            setTimeout(function() {$(widget_list).css({'position': 'absolute'}); }, 200);*/


        

    });


    var list_title = $('.main .front_main_area .widget_list h2');

    var close_trigger = $('.close-trigger');

    var current_list;

    //var list_title = $('.main .front_main_area .widget[class$="list"] h2');

    /* Open list in a popover view */

    $(list_title).on("click", function(c) {

        var e = $(this);

        create_svg(e, c);


        $(e).addClass('shadow');

        $("html, body").animate({ scrollTop: 0 }, 300);

        setTimeout(function() {
            hide_svg(e, c);

            // create_svg(view_container, c);
            $(view_container).addClass('open-view');



            var view_index = parseInt( $(e).parent().attr('data-index') );

            console.log('data view index:' + view_index);

            var widget_list_view = $(view_container).children().children().eq(view_index);

            $(widget_list_view).addClass('open-view');

            $(widget_list_view).css('width', '');

            var startWidth = $(widget_list_view).outerWidth() * 0.8;
            var endWidth = $(widget_list_view).outerWidth();
            
            var windowWidth = $(window).outerWidth();

            console.log(' windowWidth: '+ windowWidth );

            if ( windowWidth < 1000 ) {
                
                startWidth = '80%';
                
                endWidth = '100%';
            }


            $(widget_list_view).css({
                width: startWidth
            });
            setTimeout(function() {

                $(widget_list_view).animate({
                    width: endWidth
                }, {
                    duration: 300,
                    queue: false,
                    ease: 'ease-in-out',
                    complete: function() {
                        var x = $(widget_list_view).outerWidth() / 2;
                        var y = $(widget_list_view).outerHeight() / 2;

                        create_svg(widget_list_view, c, x, y, 1000);

                        setTimeout(function() {
                            $(widget_list_view).find('.list-container').addClass('open-view');
                            setTimeout(function() {
                                $(widget_list_view).find('h2').addClass('open-view-h2');
                            }, 10);
                        }, 200);

                       
                    }
                });
                
                
            }, 500);

            current_list = $(widget_list_view);

        }, 200);

    });

    /* Close list in popover view */

    $(close_trigger).on("click", function(c) {
        $(view_container).removeClass('open-view');

        $(current_list).removeClass('open-view');

        $(current_list).children().removeClass('open-view');
        $(current_list).children().children().removeClass('open-view-h2');

        console.log('close');
    });























})(jQuery);