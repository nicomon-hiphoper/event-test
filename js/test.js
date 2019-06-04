var cjApp = function() {
    var module = {
        init: function() {
            gnb();
            // this.subMenuSlide();
            this.footer();
        },
        main: function() {
            main.init();
        },
        select: function() {
            selectUi.init();
        },
        story: function() {
            storyMore.init()
        },
        subMenuSlide: function() {
            subSlide.init();
        },
        historyTab: function() {
            historyScroll()
        },
        historySwiper: function() {
            hisSwiper.init();
        },
        tabMenuSlide: function() {
            tabSlide.init();
        },
        fieldset: function() {
            placeHolder.init();
        },
        partnership: function() {
            privacySlide.init();
        },
        privacy: function() {
            versionSelect.init();
        },
        footer: function() {
            footSelect.init();
        },
        inquire: function() {
            inquireMore.init();
        }
    };

    // main
    var main = {
        init: function() {
            this.swipeKey();
            this.scrDown();
            this.tabSlideMain();
            this.tutLayer();
        },
        tutLayer: function() {
            $('.ctrTut').on('click', function(e) {
                $(this).closest('.wrapTutorial').addClass('deactive')
            })
        },
        swipeKey: function() {
            var mainkey = $('.wrapKey').addClass('swiper-container');
            var optsVis = {
                centeredSlides: true,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                autoplay: {
                    delay: 5000,
                    // disableOnInteraction: true
                },
                loop: true,
                pagination: {
                    el: '.pagKeyVis',
                    clickable: true
                },
                speed: 3000
            };
            mainkey.find('.listKey').addClass('swiper-wrapper');
            mainkey.find('li').addClass('swiper-slide');
            var swiper1 = new Swiper('.wrapKey', optsVis);

            var keyList = $('.wrapRange').addClass('swiper-container');
            keyList.find('.listRange').addClass('swiper-wrapper');
            keyList.find('li').addClass('swiper-slide');
            var optsRange = {
                slidesPerView: 'auto',
                navigation: {
                    nextEl: '.listNext',
                    prevEl: '.listPrev',
                },
                breakpoints: {
                    999: {
                        freeMode: true
                    }
                }
            };
            var swiper2 = new Swiper('.wrapRange', optsRange);

            $('.listRange')
                .on('mouseenter', function() {
                    console.log()
                    swiper1.autoplay.stop();
                })
                .on('mouseleave', function() {
                    swiper1.autoplay.start();
                });
            $('.listRange li')
                .on('mouseenter', function() {
                    var idx = $(this).index();
                    $('.socialKey').addClass('active')
                    $('.listSocialKey').eq(idx).addClass('active');
                    $('.btnCtrlKey').addClass('stop');
                })
                .on('mouseleave', function() {
                    $('.socialKey').removeClass('active').find('.listSocialKey').removeClass('active');
                    $('.btnCtrlKey').removeClass('stop');
                });
            $('.listRange li.listSoc02')
                .on('mouseenter', function() {
                    var idx = $(this).index();
                    $('.socialKey').addClass('active')
                    $('.listSocialKey').eq(0).addClass('active');
                    // $('.btnCtrlKey').addClass('stop');
                })
                .on('mouseleave', function() {
                    $('.socialKey').removeClass('active').find('.listSocialKey').removeClass('active');
                    // $('.btnCtrlKey').removeClass('stops');
                });

            $('.btnCtrlKey').on('click', function() {
                if ($(this).hasClass('stop')) {
                    swiper1.autoplay.start();
                    $(this).removeClass('stop');
                } else {
                    swiper1.autoplay.stop();
                    $(this).addClass('stop');
                }
            })
        },
        scrDown: function() {
            $('.btn_scroll').on('click', function(e) {
                var scrTar = $('#content').offset().top - $('.header').outerHeight();
                $('html, body').animate({
                    scrollTop: scrTar
                }, 350)
                e.preventDefault();
            })
        },
        tabSlideMain: function() {
            var mainTab = $('.main-swiper .tab-group');
            var tabSwiper = undefined;
            var initalSlide = mainTab.find('.active').index();
            var options = {
                initialSlide: initalSlide,
                breakpoints: {
                    999: {
                        slidesPerView: 6.5,
                        slidesPerGroup: 5
                    },
                    599: {
                        slidesPerView: 'auto',
                        spaceBetween: 10
                    }
                }
            };

            function initSwiperMain() {
                console.log(initalSlide);
                var screenWidth = window.innerWidth;

                if (screenWidth < 1000 && tabSwiper == undefined) {
                    // mainTab.wrap('<div class="swiper-container tab-swiper"></div>');
                    // mainTab.addClass('swiper-wrapper');
                    mainTab.find('.btn_tab').addClass('swiper-slide');
                    tabSwiper = new Swiper(mainTab.closest('.main-swiper'), options);
                } else if (screenWidth > 1000 && tabSwiper != undefined) {
                    console.log(tabSwiper)
                    tabSwiper == undefined
                    // mainTab.unwrap();
                    // mainTab.removeClass('swiper-wrapper')
                    mainTab.find('.btn_tab').removeClass('swiper-slide').removeAttr('style');
                }
            }
            initSwiperMain();
            window.addEventListener('resize', initSwiperMain)

        }
    }

    // gnb
    var gnb = function() {
        var screenWidth = window.innerWidth;
        var area = $('header');
        var btnGnb = area.find('.btn-gnb');
        var inArea = area.find('.gnb');
        var wScrollTar = $('.spot, .wrapKey').outerHeight() - 136;
        var btnLang = $('.util-lang').find('.btn-lang');
        var selLang = $('.util-lang').find('.sel-lang');
        var gnbMobile = $('.btnGnbMo');
        var linBanner = $('.lineBanner');
        var btnGnbSub = $('.gnb-sub').find('a');

        // lineBanner
        if (linBanner.hasClass('active')) {
            var gnbPosTop = linBanner.outerHeight();
            $('#container').css({
                marginTop: gnbPosTop
            })
        } else {
            $('#container').css({
                marginTop: 0
            })
        }
        $('.ctrl-banner').find('input').on('change', function() {
            $(this).closest('.lineBanner').removeClass('active');
            $('#container').css({
                marginTop: 0
            })
        });
        window.addEventListener('resize', function() {
            var gnbPosTop = linBanner.outerHeight();
            $('#container').css({
                marginTop: gnbPosTop
            })
        })

        // fixed Scroll
        $(window).scroll(function(e) {
            // var wScroll =
            if ($(window).scrollTop() > wScrollTar) {
                area.addClass('isScroll').removeClass('isOver')
            } else {
                if ($('#header:hover').length != 0) {
                    area.removeClass('isScroll').addClass('isOver')
                } else {
                    area.removeClass('isScroll')
                }
            }
        });

        // area enter
        area.bind('mouseenter mouseleave', function(e) {
            if (!$(this).hasClass('isScroll')) {
                if (e.type === 'mouseenter') {
                    $(this).addClass('isOver');
                } else {
                    $(this).removeClass('isOver');
                }
            }
        });

        // gnb sub button click
        btnGnbSub.on('click', function(e) {
            btnGnbSub.removeClass('active');
            btnGnb.removeClass('active');
            $(this).addClass('active');
            $(this).closest('.gnb-sub').prev('.btn-gnb').addClass('active');
        });
        if (screenWidth > 999) {
            btnGnb.on('click', function(e) {
                btnGnb.removeClass('active');
                btnGnbSub.removeClass('active');
                $(this).addClass('active');
                $(this).next().find('li').first().find('a').addClass('active');
            });
        }

        // hover each gnb button
        btnGnb.bind('mouseenter', function() {
            $(this).closest('.inner').addClass('isActive')
        });
        inArea.bind('mouseleave', function() {
            $(this).closest('.inner').removeClass('isActive');
        });

        // select languages
        btnLang.bind('click', function(e) {
            $(this).closest('.util-lang').addClass('expand');
            e.preventDefault();
        })
        selLang.bind('click', function(e) {
            var chgLang = $(this).text();
            $(this).closest('.util-lang').removeClass('expand').find('.btn-lang').text(chgLang);
            e.preventDefault();
        });

        // mobile gnb button
        // gnbMobile.bind('touchstart', function(){
        //     $(this).toggleClass('active');
        //     if(!$(this).hasClass('active')) {
        //         $(this).closest('.header').removeClass('isOver')
        //     } else {
        //         $(this).closest('.header').addClass('isOver')
        //     }
        // });
        // if ('ontouchstart' in document.documentElement) {
        //     console.log('ontouchstart going')
        //     gnbMobile.bind('touchstart', function() {
        //         console.log("[app.js].gnbMobile.touchstart");
        //         $(this).toggleClass('active');
        //         if (!$(this).hasClass('active')) {
        //             $(this).closest('.header').removeClass('isOver')
        //         } else {
        //             $(this).closest('.header').addClass('isOver')
        //         }
        //     });
        // } else {
        //     console.log('ontouchstart not going')
        //     gnbMobile.bind('click', function() {
        //         console.log("[app.js].gnbMobile.click");
        //         $(this).toggleClass('active');
        //         if (!$(this).hasClass('active')) {
        //             $(this).closest('.header').removeClass('isOver')
        //         } else {
        //             $(this).closest('.header').addClass('isOver')
        //         }
        //     });
        // }
        if (screenWidth < 1000) {
            btnGnb.on('click', function(e) {
                e.preventDefault();
                $(this).closest('.gnb').find('.btn-gnb').removeClass('active');
                $(this).addClass('active');
            })
        }

    };

    // footer family site
    var footSelect = {
        init: function() {
            $('.btn-family-foot').on('click', function(e) {
                $(this).toggleClass('active');
                e.preventDefault();
            })
        }
    }

    // select UI
    var selectUi = {
        init: function() {
            var wrapSelect = $('.ui-select');
            var btnSelect = wrapSelect.find('.btn-select');
            var txtSelect = btnSelect.find('em');
            var tarSelect = $('.list-select').find('a');

            btnSelect.bind('click', function(e) {
                if (wrapSelect.hasClass('active')) {
                    wrapSelect.removeClass('active');
                }

                $(this).closest('.ui-select').toggleClass('active');
                e.preventDefault();
            });

            tarSelect.bind('click', function(e) {
                console.log(e);
                var selText = $(this).text();
                $(this).closest('.ui-select').find('.btn-select').find('em').text(selText);
                $(this).closest('.ui-select').removeClass('active');
                e.preventDefault();
            });
        }
    };

    // 홍보 후원이야기 더보기 버튼
    var selector,
        storyModule;
    selector = {
        parent: '.award-more',
        button: '.click-btn',
        panel: '.more-content',
    }
    var storyMore = {
        init: function() {
            $(selector.button).children().on('click', function() {
                storyMore.storyModule(this)
            });
            $(selector.parent).eq(0).find($(selector.panel)).addClass('active');
        },
        storyModule: function(el) {
            var target = $(el).data('target');

            function pick() {
                var thisclass = '.' + target;

                if ($(selector.button, thisclass).children('.simple').hasClass('active')) {
                    $(selector.panel, '#' + target).removeClass('active');
                    $(selector.button, thisclass).children('.detail').addClass('active').siblings().removeClass('active');
                } else if ($(selector.button, thisclass).children('.detail').hasClass('active')) {
                    $(selector.panel, '#' + target).addClass('active');
                    $(selector.button, thisclass).children('.simple').addClass('active').siblings().removeClass('active');
                };
            }
            pick();
        }
    };

    var subSlide = {
        init: function() {
            this.slide();
        },
        slide: function() {
            var winWidth = $(window).width();
            var subMenu = $('.sub-menu .inner')
            var subWrapWidth = subMenu.width();
            var subMenuLength = subMenu.find('li').length;
            var subMenuWidth = subMenu.find('li').width() * subMenuLength;
            var subMenuSwiper = undefined;
            var initalSlide = subMenu.find('.active').parent('li').index();
            var options = {
                initialSlide: initalSlide,
                breakpoints: {
                    999: {
                        slidesPerView: 'auto'
                    },
                    599: {
                        slidesPerView: 'auto'
                    }
                }
            };

            function initSwiper() {
                var screenWidth = window.innerWidth;
                initalSlide = subMenu.find('.active').parent('li').index();
                if (screenWidth < 1000 && subMenuSwiper == undefined) {
                    subMenu.addClass('swiper-container');
                    subMenu.find('ul').addClass('swiper-wrapper');
                    subMenu.find('li').addClass('swiper-slide');
                    subMenuSwiper = new Swiper('.sub-menu .inner', options)
                } else if (screenWidth > 1000 && subMenuSwiper != undefined) {
                    subMenuSwiper = undefined;
                    $('.swiper-wrapper').removeAttr('style');
                    subMenu.find('.swiper-slide').each(function() {
                        $(this).removeAttr('class').removeAttr('style');
                    })
                }
            }
            initSwiper();
            window.addEventListener('resize', initSwiper)

        }
    }

    var hisSwiper = {

        init: function() {
            this.slide();
            // $(window).resize(function() {
            //     subSlide.slide()
            // })
        },
        slide: function() {
            var winWidth = $(window).width();
            var hisArea = $('.cnt-left')
            var subWrapWidth = hisArea.width();
            var subMenuLength = hisArea.find('li').length;
            var subMenuWidth = hisArea.find('li').width() * subMenuLength;
            var hisImgSwiper = undefined;
            var options = {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    999: {
                        slidesPerView: 'auto'
                    }
                }
            };

            function initSwiper() {
                var screenWidth = window.innerWidth;
                if (screenWidth < 1000 && hisImgSwiper == undefined) {
                    hisArea.addClass('swiper-container');
                    hisArea.append('<button class="sw-nav swiper-button-next" type="button">');
                    hisArea.append('<button class="sw-nav swiper-button-prev" type="button">');
                    hisArea.find('ul').addClass('swiper-wrapper');
                    hisArea.find('li').addClass('swiper-slide');
                    hisImgSwiper = new Swiper(hisArea, options)
                } else if (screenWidth > 1000 && hisImgSwiper != undefined) {
                    hisImgSwiper = undefined;
                    hisArea.removeClass('swiper-container swiper-container-horizontal')
                    hisArea.find('.history-img').removeClass('swiper-wrapper').removeAttr('style');
                    hisArea.find('.sw-nav').remove();
                    hisArea.find('.swiper-notification').remove();
                    $('.swiper-wrapper').removeAttr('style');
                    $('.swiper-slide').each(function() {
                        $(this).removeAttr('class').removeAttr('style');
                    })
                }
            }
            initSwiper();
            window.addEventListener('resize', initSwiper)

        }

    }

    var historyScroll = function() {

        var btnUl = $('.company-history .tab-group');
        var $btn = btnUl.find('a');
        var cnt = $('.company-history-cnt > section');
        var headT = $('.sub-menu').offset().top;
        var headH = $('#header').outerHeight();
        var headFix = headH + $('.company-history .tab-group').outerHeight();

        $btn.on('click', function(e) {
            e.preventDefault();
            // $('body, html').animate({scrollTop: $(this.hash).offset().top - headFix}, 500);
            var tarHis = $(this).attr('href');
            $(this).closest('.company-history-cnt').children('section').removeClass('active');
            $(tarHis).addClass('active');
        });
    }

    var tabSlide = {
        init: function() {
            this.tabSlideMo();
        },
        tabSlideMo: function() {
            var winWidth = $(window).width();
            var tabArea = $('.tab-group');
            var subWrapWidth = tabArea.width();
            var subMenuLength = tabArea.find('.btn_tab').length * 1.5;
            var subMenuWidth = tabArea.find('.btn-tab').width() * subMenuLength;
            var tabSwiper = undefined;
            var initalSlide = tabArea.find('.active').index();
            var options = {
                initialSlide: initalSlide,
                breakpoints: {
                    599: {
                        slidesPerView: 'auto',
                        spaceBetween: 10
                    }
                }
            };

            function initTabSwiper() {
                var screenWidth = window.innerWidth;

                if (screenWidth < 600 && tabSwiper == undefined) {

                    tabArea.each(function(i) {
                        $(this).wrap('<div class="swiper-container tab-swiper"></div>');
                        $(this).addClass('swiper-wrapper');
                        $(this).find('.button').addClass('swiper-slide');
                        tabSwiper = new Swiper(tabArea.closest('.tab-swiper'), options);
                    })
                } else if (screenWidth > 600 && tabSwiper != undefined) {
                    tabSwiper == undefined;
                    tabArea.each(function(i) {
                        $(this).removeClass('swiper-wrapper');
                        $(this).find('.button').removeClass('swiper-slide').removeAttr('style');
                        // $(this).unwrap();
                        console.log($(this));
                    })
                    // tabArea.unwrap();
                    // tabArea.removeClass('swiper-wrapper')
                    // tabArea.find('.btn_tab').removeClass('swiper-slide').removeAttr('style');
                }

            }
            initTabSwiper();
            window.addEventListener('resize', initTabSwiper)

        }
    }

    //input placeholder
    var placeHolder = {
        init: function() {
            var placeholderTg = $('.input-box input, .input-box textarea');
            placeholderTg.on('focus', function() {
                $(this).siblings('label').fadeOut('fast');
            });
            placeholderTg.on('focusout', function() {
                if ($(this).val() == '') {
                    $(this).siblings('label').fadeIn('fast');
                };
            });
        }
    }

    var versionSelect = {
        init: function() {
            var wrapSelect = $('.ui-select');
            var btnSelect = wrapSelect.find('.btn-select');
            var txtSelect = btnSelect.find('em');
            var tarSelect = $('.list-select').find('a');

            function tarSlide() {
                if (wrapSelect.hasClass('active')) {
                    wrapSelect.removeClass('active');
                    tarSelect.closest('.list-select').slideUp();
                } else {
                    wrapSelect.addClass('active');
                    tarSelect.closest('.list-select').slideDown();
                }
            }

            btnSelect.on('click', function(e) {
                tarSlide();
                e.preventDefault();
            });

            tarSelect.on('click', function(e) {
                var selText = $(this).text();
                $(this).closest('.ui-select').find('.btn-select').find('em').text(selText);
                $(this).parent().addClass('active').siblings().removeClass('active');
                tarSlide();
            });
        }
    }

    var privacySlide = {
        init: function() {
            var wrapSelect = $('.business-area');
            var btnSelect = wrapSelect.find('.btn');
            var tarSelect = $('.slide-area');

            function tarSlide() {
                if (wrapSelect.hasClass('active')) {
                    wrapSelect.removeClass('active');
                    tarSelect.slideUp();
                } else {
                    wrapSelect.addClass('active');
                    tarSelect.slideDown();
                }
            }

            btnSelect.on('click', function(e) {
                tarSlide();
                e.preventDefault();
            });
        }
    }

    var inquireMore = {
        init: function() {
            $('.btn_slide').on('click', function() {
                $(this).toggleClass('active');
                $(this).prev('.slide-area').toggleClass('active')
            })
        }
    };


    return module;
}();

cjApp.init();




var hhpEvent = function() {
    var module = {
        init: function() {
            
        },
        subMenuSlide: function() {
            subSlide.init();
        }
    };

    var subSlide = {
        init: function() {
            this.slide();
        },
        slide: function() {

            var $event_view = $('.event_view'),
                $event_lookbook_slide = $event_view.find('.event_lookbook_slides');

            $event_lookbook_slide.slick({
                prevArrow:'<button type="button" class="slick-prev pos_center_after pos_center v"><span class="s_out">이전</span></button>',
                nextArrow:'<button type="button" class="slick-next pos_center_after pos_center v"><span class="s_out">다음</span></button>',
                autoplay:true,
                autoplaySpeed:5000,
                pauseOnDotsHover:true,
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '10',
                variableWidth: true,
                //respondTo : 'window',
                responsive: [
                    {breakpoint:1024,
                    settings: {slidesToShow:1,slidesToScroll:1,dots:true,arrows:false,pauseOnDotsHover:true,touchMove:true,}
                    }
                ]
            }).each(function(i,el){
                if( el.slick.slideCount <= 1 ){
                    $(el).slick('unslick');
                }
            });

            var $a_link = $('.event_lookbook_slides').find('a');
            $a_link.on('click', function(e){
                e.stopPropagation();     
            });            


        }        
    }


    return module;
}();

hhpEvent.init();