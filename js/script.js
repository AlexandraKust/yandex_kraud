window.addEventListener('DOMContentLoaded', () => {

	const anchors = document.querySelectorAll('a[href*="#"]')

	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const blockID = anchor.getAttribute('href').substr(1)

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	}


	const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
		let swiper;
		let wrapper = document.querySelector(swiperClass).firstChild.nextSibling;

		breakpoint = window.matchMedia(breakpoint);

		const enableSwiper = function (className, settings) {
			wrapper.classList.add('swiper-wrapper');
			Array.from(wrapper.children).forEach(slide => {
				slide.classList.add('swiper-slide')
			});

			swiper = new Swiper(className, settings);

			if (callback) {
				callback(swiper);
			}
		}

		const checker = function () {
			if (breakpoint.matches) {
				return enableSwiper(swiperClass, swiperSettings);
			} else {
				if (swiper !== undefined) {
					swiper.destroy('true', 'true');

					wrapper.classList.remove('swiper-wrapper');
					Array.from(wrapper.children).forEach(slide => {
						slide.classList.remove('swiper-slide')
					});
				};
				return;
			}
		};

		breakpoint.addEventListener('change', checker);
		checker();
	}

	resizableSwiper(
		'(max-width: 992px)',
		'.steps__swiper',
		{
			loop: false,
			spaceBetween: 32,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		},
	);


	let participantsSwiper = new Swiper('.participants__swiper', {
		autoplay: {
			delay: 4000,
		},
		lazy: true,
		speed: 1000,
		slidesPerView: 3,
		loop: true,
		spaceBetween: 57,

		pagination: {
			el: ".participants__pagination",
			type: "fraction",
		},

		navigation: {
			nextEl: document.querySelector('.participants__swiper').closest('section').querySelector('.button-next'),
			prevEl: document.querySelector('.participants__swiper').closest('section').querySelector('.button-prev'),
		},

	});


});

