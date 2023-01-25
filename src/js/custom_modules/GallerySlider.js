import closest from "../modules/Closest";

/*
	--------------------------------------------
	--------------------------------------------
					GALLERY SLIDER
	--------------------------------------------
	--------------------------------------------
 */
function GallerySlider(swiper) {
	let sliders = [],
		classes = {
			slider: 'tmpl-hh__slider-gallery',
			sliderFocus: 'tmpl-hh__slider-gallery--focus',
			pagination: 'tmpl-hh__slider-gallery__pagination',
			slide: 'tmpl-hh__slider-gallery-slide',
			slideActive: 'tmpl-hh__slider-gallery-slide--active',
			slideFocus: 'tmpl-hh__slider-gallery-slide--focus',
			swiperSlideActive: 'tmpl-hh__swiper-slide-active',
		};

	let focusSlider = function (slider) {
		blurSlider();
		slider.el.classList.add(classes.sliderFocus);
	}
	let blurSlider = function () {
		for (let i = 0; i < sliders.length; i++){
			sliders[i].el.classList.remove(classes.sliderFocus);
		}
	}
	let checkSlideTarget = function (target) {
		return [
			target.classList.contains(classes.slide),
			closest(target, '.' + classes.slide)
		]
	}
	let activate = function (slide) {
		slide.classList.add(classes.slideActive);
		slide.classList.add(classes.slideFocus);
	}
	let deactivate = function (slide) {
		slide.classList.remove(classes.slideActive);
		setTimeout(function () {
			slide.classList.remove(classes.slideFocus);
		}, 400);
	}
	let deactivateAll = function () {
		let slides = document.getElementsByClassName(classes.slideActive);
		for (let i = 0; i < slides.length; i++){
			deactivate(slides[i]);
		}
	}
	let listenSlideClick = function () {
		for(let i = 0; i < sliders.length; i++){
			sliders[i].wrapperEl.addEventListener('click', function (event) {
				if(window.innerWidth <= 1019){
					return false;
				}

				let target = event.target;
				if(!target){
					return false;
				}

				let check  = checkSlideTarget(target),
					slide;
				if(check[0] || check[1]){
					if(check[0]){
						slide = target;
					}else{
						slide = check[1];
					}

					if(!slide.classList.contains(classes.slideActive)){
						deactivateAll();
						if(slide.classList.contains(classes.swiperSlideActive)){
							focusSlider(sliders[i]);
							activate(slide);
						}
					}
				}
			});
		}
	}

	let listenOutClick = function () {
		document.addEventListener('mousedown', function (event) {
			if (!event.target) return;
			let check  = checkSlideTarget(event.target);
			if(!check[0] && !check[0]){
				deactivateAll();
			}

			setTimeout(function () {
				blurSlider(closest(event.target, "." + classes.slider));
			}, 400);
		});
	}

	let init = function () {
		let slidersItems = document.getElementsByClassName(classes.slider);

		for(let i = 0; i < slidersItems.length; i++){
			sliders.push(
				swiper.init(slidersItems[i], {
					loop: true,
					slidesPerView: 3,
					centeredSlides: true,
					spaceBetween: 25,
					pagination: {
						el: '.' + classes.pagination,
						clickable: true,
						type: 'bullets'
					},
					navigation: {
						prevEl: slidersItems[i].getAttribute('data-arrow-prev'),
						nextEl: slidersItems[i].getAttribute('data-arrow-next')
					},
					on: {
						slideChange: function () {
							deactivateAll();
						}
					},
					breakpoints: {
						1019: {
							slidesPerView: 2
						},
						529: {
							slidesPerView: 1,
							autoplay: true
						}
					}
				})
			);
		}

		listenSlideClick();
		listenOutClick();
	}

	init();
}

export default GallerySlider;
