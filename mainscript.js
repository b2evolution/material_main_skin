(function($) {
    'use strict';


    element_click($('.widget_core_coll_media_index .loadimg'));

    element_click($('.widget_core_org_members .loadimg'));

    element_click($('.widget_core_coll_avatar .loadimg'));


    element_click($('.user_link'));

    element_click($('.widget_core_coll_common_links ul li strong a'));


    /* Click events setup */

    function element_click(e) {

        var element = e;
        
        var down = 0;

        $(element).on("mousedown", function(c) {
            var e = $(this).parent();
            create_svg(e, c);
             console.log('click down');
            
            down = 1;
        });

        $(element).on("mouseleave", function(c) {
            if( down === 1 ){
            var e = $(this).parent();
            $(element)[0].click();
            hide_svg(e, c);
            setTimeout(function() {
                $(e).find('svg').detach();
            }, 200);
                down = 0;
            }
        });
        
        

    }





    /* Create circle in svg to its parent */

    function create_svg(e, c, x, y, d) {

        var box = $(e);

        var setX = parseInt(c.pageX - $(e).offset().left);
        var setY = parseInt(c.pageY - $(e).offset().top);

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


    /* Main Area Widget Aligns */

    var main_area = $('.front_main_content');

    $(main_area).ready(function() {

        var left = [
            'widget_core_coll_avatar',
            'widget_core_coll_title',
            'widget_core_coll_tagline',
            'widget_core_user_links',
            'widget_plugin_evo_Calr',
            'widget_core_coll_common_links',
            'widget_core_coll_search_form',
            'widget_core_breadcrumb_path',
            'widget_plugin_evo_facebook',
            'widget_core_free_html',
            'widget_core_user_login',
            'widget_core_user_tools',
            'widget_core_content_hierarchy',
            'widget_core_coll_longdesc',
            'widget_core_msg_menu_link',
            'widget_core_menu_link',
            'widget_core_coll_current_filters'
        ];

        var right = [
            'widget_core_coll_category_list',
            'widget_core_coll_post_list',
            'widget_core_coll_link_list',
            'widget_core_coll_comment_list',
            'widget_core_coll_post_list',
            'widget_core_coll_tag_cloud',
            'widget_core_coll_xml_feeds',
            'widget_plugin_evo_Arch',
            'widget_plugin_evo_WhosOnline',
            'widget_core_colls_list_public',
            'widget_core_colls_list_owner',
            'widget_core_linkblog'
        ];


        $(main_area).prepend('<div class="column-left"></div><div class="column-right"></div>');


        $(main_area).find('.evo_widget').each(function() {

            for (var i = 0; i < left.length; i++) {
                if ($(this).hasClass(left[i])) {
                    $('.column-left').append($(this).detach());
                }
            }
            for (var j = 0; j < right.length; j++) {
                if ($(this).hasClass(right[j])) {
                    $('.column-right').append($(this).detach());
                }
            }

        });
        
        $(main_area).find('.evo_container__front_page_primary').each(function() {
            
              $('.column-left').append($(this).detach());
            
        });
        

        $(main_area).addClass('load');

    });








    /* Creating 3 columns (Info section) in secondary area */

    $('.secondary_area').ready(function() {

        var widgets = [
            '.widget_plugin_evo_Calr',
            '.widget_core_profile_menu_link',
            '.widget_core_coll_avatar',
            '.widget_core_user_login',
            '.widget_core_content_hierarchy',
            '.widget_core_online_users',
            '.widget_core_user_avatars',
            '.widget_core_coll_tag_cloud',
            '.widget_core_coll_xml_feeds',
            '.widget_plugin_evo_Arch',
            '.widget_plugin_evo_WhosOnline',
            '.widget_core_colls_list_public',
            '.widget_core_colls_list_owner',
            '.widget_core_linkblog',
            '.widget_core_coll_search_form',
            '.widget_core_user_tools'
        ];


        var secondary = $('.secondary_area .col-md-12:first-child');
        var main_footer = $('.secondary_area .col-md-12:last-child');

        if ($(main_footer).find('.info_section').size() < 1) {
            $(main_footer).prepend('<div class="info_section"></div>');
        }

        for (var i = 0; i < widgets.length; i++) {

            $('.info_section').append($(secondary).find(widgets[i]).detach());
        }

    });



    /* Social Icons Setup */

    $('.ufld_icon_links a').each(function() {

        var mthis = $(this);

        var class_attr = $(mthis).attr('class');

        $(mthis).children('span').addClass(class_attr);

    });




    /* Widget form label animation */

    label_animation('.widget_core_coll_search_form form input[type=text]', '.widget_core_coll_search_form h2');

    label_animation('.widget_core_coll_search_form form input[type=text]', '.widget_core_coll_search_form h1');


    function label_animation(input, label) {

        $(input).ready(function() {

            $(input).focusin(function() {
                $(label).addClass('label-hide');
            });

            if ($(input).val().length < 1) {
                $(label).removeClass('label-hide');
            }

            $(input).focusout(function() {

                if ($(this).val().length < 1) {
                    $(label).removeClass('label-hide');
                }
            });

        });


    }




    /* Lists setup in main area */

    var view_container = $('.view-container');

    $('.main .front_main_content .evo_widget[class$="list"]').each(function(e) {

        var widget_list = $(this);

        $(widget_list).addClass('widget_list');

        $(widget_list).attr('data-index', e);

        var widget_list_view = $(widget_list).clone();

        $(widget_list_view).find('h2').append('<span class="close-trigger"></span>');

        var list_content = $(widget_list_view).children().detach();
        $(widget_list_view).append('<div class="list-container content"></div>');
        
        $(widget_list_view).find('.list-container').append(list_content);
         $(widget_list_view).css('display', 'none');

        $(view_container).children().children('.widget-container').append(widget_list_view);


        $(widget_list).find('h2').append('<span class="list-icon"><i class="fa fa-angle-right"></i></span>');

        $(widget_list).find('h4').detach();
        $(widget_list).find('ul').detach();

        $(widget_list).addClass('visible');

    });


    var list_title = $('.main .front_main_content .widget_list h2');

    var close_trigger = $('.close-trigger');

    var current_list;

    var site_info = $('.secondary_area .container .row .col-md-12:last-child');

    /* Open list in a view container */

    $(list_title).on("click", function(c) {

        var e = $(this);

        create_svg(e, c);

        var view_index = parseInt($(e).parent().attr('data-index'));

        var widget_list_view = $(view_container).children().children().children().eq(view_index);

        $(widget_list_view).offset();

        $(widget_list_view).css('width');

        var bodyHeight = parseInt($('body').outerHeight());

        var widgetHeight = parseInt($(widget_list_view).outerHeight()) + 200;

        if (widgetHeight > bodyHeight) {

            var bottom_space = widgetHeight - bodyHeight;

            $(site_info).css('padding-top', bottom_space + 'px');

        }
        bodyHeight = parseInt($('body').outerHeight());
        $(view_container).css('height', bodyHeight + 'px');

        $(e).addClass('shadow');

        $("html, body").animate({scrollTop: 0}, 300);

        $(widget_list_view).css('display', 'inline-block');
        



        setTimeout(function() {
            hide_svg(e, c);

            $('body').addClass('open-view');

            $(widget_list_view).addClass('show-widget');


            setTimeout(function() {
               
                setTimeout(function() {

                    $(widget_list_view).find('.list-container').css({
                        'opacity': '1',
                        '-webkit-transform': 'translateY(0)',
                        '-moz-transform': 'translateY(0)',
                        '-ms-transform': 'translateY(0)',
                        '-o-transform': 'translateY(0)',
                        'transform': 'translateY(0)'
                    });

                    $(widget_list_view).find('h2').css({
                        'opacity': '1',
                        '-webkit-transform': 'translateY(0)',
                        '-moz-transform': 'translateY(0)',
                        '-ms-transform': 'translateY(0)',
                        '-o-transform': 'translateY(0)',
                        'transform': 'translateY(0)'
                    });

                }, 0);
                

            }, 500);

            current_list = $(widget_list_view);

        }, 300);

    });

    /* Close list in popover view */

    $(close_trigger).on("click", function(c) {

        $(site_info).css('padding-top', '');

       $('body').removeClass('open-view');
        $(current_list).removeClass('show-widget');
           
        setTimeout(function() {
             $(current_list).css('display', 'none');
        }, 900);
            
        
        $(current_list).find('.list-container').css({
            'opacity': '0',
            '-webkit-transform': '',
            '-moz-transform': '',
            '-ms-transform': '',
            '-o-transform': '',
            'transform': ''
        });

        $(current_list).find('h2').css({
            'opacity': '0',
            '-webkit-transform': '',
            '-moz-transform': '',
            '-ms-transform': '',
            '-o-transform': '',
            'transform': ''
        });
          

    });




})(jQuery);