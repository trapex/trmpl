// main bundle >> main.bundle.js
import common from './modules/common.module';
/*eslint-disable */


// MENU
$(function () {
    let $nav = $('.js-header-nav-icon'),
        $header = $('.js-header'),
        $item = $('[data-menu-item]'),
        $section = $('[data-js-index-section]');
    $nav.on('click', () => {
        $header.toggleClass('header_open');
    });
    $item.on('click', (e) => {
        let $el = $(e.target);
        if ($header.hasClass('header_open')) {
            $header.removeClass('header_open');
        }
        // let menu = $el.data('menu-item');
        let section = $(`[data-js-index-section=${$el.data('menu-item')}]`);
        let offset = section.offset().top - $header.height();
        let scroll_speed;
        switch ($el.data('menu-item')) {
            case 'product':
                scroll_speed = 300;
                break;
            case 'vacancy':
                scroll_speed = 600;
                break;
            case 'contact':
                scroll_speed = 900;
                break;
            default:
                scroll_speed = 300;
                break;
        }
        $('html').animate({scrollTop: offset}, scroll_speed, 'linear');
        $('body').animate({scrollTop: offset}, scroll_speed, 'linear');
    });
    let goToVacancy = function() {
		let item = location.hash.split('#')[1];
		if (item == 'vacancies') {
			let section = $('[data-js-index-section="vacancy"]');
			let offset = section.offset().top - $header.height();
			$('html').animate({scrollTop: offset}, 100, 'linear');
			$('body').animate({scrollTop: offset}, 100, 'linear');
		} else {
			location.hash = '';
		}
	};

	if (location.hash != '') {
		goToVacancy();
	}

	// $(window).on('hashchange', () => {
	// 	goToVacancy();
	// });
});

// SLICK
$(function () {
    let slickInit = function () {
        let $vacancy_list = $('.js-vacancy-list'),
            $nav = $('.js-vacancy-nav');
        $vacancy_list.slick({
            infinite: true,
            appendArrows: $nav,
            prevArrow: '<div class="slick-arrow slick-arrow_prev"></div>',
            nextArrow: '<div class="slick-arrow slick-arrow_next"></div>',
            draggable: true,
            initialSlide: 0,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 680,
                    settings: {
                        arrows: true
                    }
                },
                {
                    breakpoint: 2000,
                    settings: "unslick"
                }
            ]
        });
        $vacancy_list.on('afterChange', (slick, currentSlide) => {
            let $item = $('[data-js-vacancy-item]'),
                $nav_item = $('[data-js-vacancy-nav-item]'),
                $nav_item_active = $('.vacancy__nav-item_active');
            let current = $('.slick-active').data('js-vacancy-item');
            $item.removeClass('vacancy__item_active');
            $(`[data-js-vacancy-item=${current}]`).addClass('vacancy__item_active');
            $nav_item.removeClass('vacancy__nav-item_active');
            $(`[data-js-vacancy-nav-item=${current}]`).addClass('vacancy__nav-item_active');
        });
    };

    slickInit();

    let $item = $('[data-js-vacancy-item]'),
        $nav_item = $('[data-js-vacancy-nav-item]'),
        $nav_item_active = $('.vacancy__nav-item_active');
    let current = $nav_item_active.data('js-vacancy-nav-item');
    $item.removeClass('vacancy__item_active');
    $(`[data-js-vacancy-item=${current}]`).addClass('vacancy__item_active');

    $nav_item.on('click', (e) => {
        let $el = $(e.target);
        let current = $el.data('js-vacancy-nav-item');
        $item.removeClass('vacancy__item_active');
        $(`[data-js-vacancy-item=${current}]`).addClass('vacancy__item_active');
        $nav_item.removeClass('vacancy__nav-item_active');
        $(`[data-js-vacancy-nav-item=${current}]`).addClass('vacancy__nav-item_active');
    });

    $(window).on('resize', () => {
        $('.js-vacancy-list').slick('resize');
    });

});

$(function () {
    let $scroll_arrow = $('.js-index-scroll-arrow'),
        $window = $(window),
        $header = $('.js-header');

    if ($(window).scrollTop() > 0) {
        $scroll_arrow.addClass('index__scroll-btn_hidden');
        $header.addClass('header_scroll');
    } else {
        $scroll_arrow.removeClass('index__scroll-btn_hidden');
        $header.removeClass('header_scroll');
    }

    window.addEventListener('scroll', (e) => {
        if ($(window).scrollTop() > 0) {
            $scroll_arrow.addClass('index__scroll-btn_hidden');
            $header.addClass('header_scroll');
        } else {
            $scroll_arrow.removeClass('index__scroll-btn_hidden');
            $header.removeClass('header_scroll');
        }
    }, Modernizr.passiveeventlisteners ? {passive: true} : false);
    window.addEventListener('touchstart', (e) => {

    }, Modernizr.passiveeventlisteners ? {passive: true} : false);
});

$(function () {
	let $share = $('[data-js-share]');
	$share.on('click', (e) => {
		e.preventDefault();
		let $el = $(e.target);
		let share_link = `https://vk.com/share.php?url=${location.origin}/trmpln/public/share/share-vk.html&title=TRMPLN&description=TRMPLN&image=/img/share-vk.jpg`;
		if ($el.data('js-share') == 'fb') {
			share_link = `https://www.facebook.com/sharer/sharer.php?u=${location.origin}/trmpln/public/share/share-fb.html`;
		}
		let height = 370,
			width = 660;
		let top = (screen.height - height)/2,
			left = (screen.width - width)/2;
		let params = `top=${top},left=${left},height=${height},width=${width},resizable=no`;
		let win = window.open(share_link, "share", params);
		win.focus();

	});
});
