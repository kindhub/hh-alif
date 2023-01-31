import VSwiper from "./modules/VSwiper";
import Video from "./modules/Video";
import Anchor from './modules/Anchor';
import Content from "./modules/Content";
import Nav from "./modules/Nav";
import VacancyBtn from "./modules/VacancyBtn";

/*
	--------------------------------------------
	--------------------------------------------
						SWIPER
	--------------------------------------------
	--------------------------------------------
 */

	function initGallerySlider() {
		swiper.init('.tmpl-hh__gallery-slider', {
			loop: true,
			slidesPerView: 3,
			centeredSlides: true,
			spaceBetween: 40,
			navigation: {
				prevEl: '.tmpl-hh__gallery-slider-arrow-prev',
				nextEl: '.tmpl-hh__gallery-slider-arrow-next',
			},
			bulletActiveClass: '.tmpl-hh__gallery-slider-pagination-active',
			pagination: {
				el: '.tmpl-hh__gallery-slider__pagination',
				clickable: true,
			},
			breakpoints: {
				1339: {
					spaceBetween: 30
				},
				529: {
					spaceBetween: 15
				}
			},
		})
	}


/*
	--------------------------------------------
	--------------------------------------------
						COMMON
	--------------------------------------------
	--------------------------------------------
 */


const swiper = new VSwiper();
new Video();
new Anchor();
new Content();
new Nav();
new VacancyBtn();

initGallerySlider();