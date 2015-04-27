(function($) {
    'use strict';
    $('.circle-svg-a a, .circle-svg-span span').on("click", function(e) {

        var box = $(this);
        var setX = parseInt(e.pageX - $(this).offset().left);
        var setY = parseInt(e.pageY - $(this).offset().top);
        var radius = $(box).outerWidth() / 2;
        if ($(box).find("svg").length === 0) {
            $(box).append('<svg><circle class="circle-1" cx="' + setX + '" cy="' + setY + '" r="' + (radius - 10) + '"></circle></svg>');
        }

        $(box).find('svg').css('opacity', '1');
        $(box).find('svg').animate({opacity: '0'}, {duration: 800, queue: false});
        var c1 = $(box).find(".circle-1");

        c1.attr('cx', setX);
        c1.attr('cy', setY);

        var addv = radius - 10;

        $(c1).animate({"r": radius}, {duration: 350,
            step: function(val) {
                c1.attr("r", (val + addv));
            }
        });

    });





    var bg_picture = $('#bg_picture');

    $(bg_picture).addClass('show_off');




    var img_link = $('.loadimg');

    $(img_link).on("mousedown", function(c) {
        var e = $(this).parent();

        create_svg(e, c);

    });

    $(img_link).on("mouseup", function(c) {
        var e = $(this).parent();
        hide_svg(e, c);
        setTimeout(function() {
            $(e).find('svg').detach();
        }, 200);
    });

    $(img_link).on("mouseleave", function(c) {
        var e = $(this).parent();
        hide_svg(e, c);
        setTimeout(function() {
            $(e).find('svg').detach();
        }, 200);
    });






    var user_link = $('.user_link');

    $(user_link).on("mousedown", function(c) {
        var e = $(this).parent();
        create_svg(e, c);
    });

    $(user_link).on("mouseup", function(c) {
        var e = $(this).parent();
        hide_svg(e, c);
        setTimeout(function() {
            $(e).find('svg').detach();
        }, 200);
    });

    $(user_link).on("mouseleave", function(c) {
        var e = $(this).parent();
        hide_svg(e, c);
        setTimeout(function() {
            $(e).find('svg').detach();
        }, 200);
    });



    function create_svg(e, c) {

        var box = $(e);

        var setX = parseInt(c.pageX - $(e).offset().left);
        var setY = parseInt(c.pageY - $(e).offset().top);
        var radius = $(box).outerWidth() / 2;
        if ($(box).find("svg").length === 0) {
            $(box).append('<svg><circle class="circle-1" cx="' + setX + '" cy="' + setY + '" r="' + (radius - 10) + '"></circle></svg>');
        }

        $(box).find('svg').css('opacity', '0.2');
        $(box).find('svg').animate({opacity: '0.8'}, {duration: 200, queue: false});
        var c1 = $(box).find(".circle-1");

        c1.attr('cx', setX);
        c1.attr('cy', setY);

        var start_r = radius;

        $(c1).animate({"r": radius}, {duration: 350,
            step: function(val) {
                c1.attr("r", (val + start_r));
            }
        });


    }

    function hide_svg(e, c) {
        var box = $(e);
        $(box).find('svg').animate({opacity: '0'}, {duration: 200, queue: false, complete: function() {
            }
        });
    }



    $('.main.footer').ready(function() {

        var secondary = $('.main.footer .col-md-12');

        var evo_Calr = $(secondary).find('.widget_plugin_evo_Calr');

        var longdesc = $(secondary).find('.widget_core_coll_longdesc');
        
        var menu_link = $(secondary).find('.widget_core_profile_menu_link');

        
        $(secondary).prepend('<div class="info_section"></div>');
        
        
        $('.info_section').append($(menu_link).detach());
        $('.info_section').append($(longdesc).detach());
        $('.info_section').append($(evo_Calr).detach());


    });





    $('.main.footer .widget').each(function(e) {

        if ($(this).find('ul').size() > 0) {
            var widget_list = $(this);

            $(widget_list).addClass('secondary_area');
        }

    });


    $('.main .front_main_area .widget').each(function(e) {

        if ($(this).find('ul').size() > 0) {

            var widget_list = $(this);

            $(widget_list).addClass('widget_list');

            var title_height = $(widget_list).find('h2').outerHeight();

            $(widget_list).css('max-height', title_height);

            if ($(widget_list).parent().find('.widget_list_container').size() < 1) {

                $(widget_list).parent().append('<div class="widget_list_container widget"></div>');
            }

            $('.widget_list_container').append($(widget_list).detach());

            var u = $(widget_list).find('>ul').size();

            for (var i = 0; i < u; i++) {

                $(widget_list).append('<span class="list-' + i + '"></span>');

                $('.list-' + i).append($(widget_list).find('>h4:first-child').detach());
                $('.list-' + i).append($(widget_list).find('>ul:first-child').detach());

            }



            var pTop = $(widget_list).parent().offset().top;
            var mTop = $(widget_list).offset().top - pTop;

            var pLeft = $(widget_list).parent().offset().left;
            var mLeft = $(widget_list).offset().left - pLeft;

            var mWidth = $(widget_list).outerWidth();

            $(widget_list).css({
                'top': mTop + 'px',
                'left': mLeft + 'px'
            });

            setTimeout(function() {
                $(widget_list).css({
                    'position': 'absolute'
                });
            }, 500);

        }

    });


    var list_title = $('.main .widget_list h2');

    var zIndex = 10;

    $(list_title).on("click", function(c) {

        var e = $(this);

        var title_height = $(e).outerHeight();

        create_svg(e, c);

        $(e).parent('.widget').toggleClass('show');
        zIndex++;

        $(e).parent().css('z-index', zIndex);
        if ($(e).parent('.widget').hasClass('show')) {



            $(e).parent().animate({
                'max-height': '7000px'
            }, {duration: 500, queue: false});

        } else {



            $(e).parent().animate({
                'max-height': title_height + 'px'
            }, {duration: 500, queue: false, complete: function() {
                    $(e).parent().css('z-index', '0');
                }});

        }


        setTimeout(function() {
            hide_svg(e, c);
        }, 200);

    });







    var panel_id = 0;

    $('.panel-group .panel').each(function() {
        panel_id++;

        $(this).find('.panel-toggle').attr('data-target', '.pcollapse-' + panel_id);

        $(this).find('.panel-toggle').addClass(' collapsed');

        $(this).find('.panel-collapse').addClass(' pcollapse-' + panel_id);


        if ($(this).find('.panel-heading').length > 0) {

            $(this).find('.panel-collapse').addClass(' collapse');
        }

    });



    $('.star_rating').each(function() {

        $(this).css('visibility', 'hidden');

        var stars = parseInt($(this).find('>div').text());

        $(this).find('>div').detach();

        $(this).attr('id', 'comment_rating');



        for (var i = 0; i < stars; i++) {

            $(this).append('<span class="comment_rating raty_star_on"> </span>');

        }
        var stars_off = 5 - stars;

        for (var j = 0; j < stars_off; j++) {

            $(this).append('<span class="comment_rating raty_star_off"> </span>');

        }

        $(this).css('visibility', 'visible');

    });







})(jQuery);