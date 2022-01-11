var swiper = new Swiper(".mySwiper", {
	cssMode: true,
	slidesPerView: 3,
	spaceBetween: 14,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	mousewheel: {
		invert: true,
	  },
	autoplay: {
		delay: 5000,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},

		768: {
			slidesPerView: 2,
		},

		992: {
			slidesPerView: 2,
		},

		1280: {
			slidesPerView: 3,
		},
	}
});




var swiper = new Swiper(".brandSwiper", {
	loop: true,
	cssMode: true,
	slidesPerView: 5,
	spaceBetween: 60,
	centeredSlides: true,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	mousewheel: true,

	breakpoints: {

		320: {
			slidesPerView: 2,
			spaceBetween: 30
		},

		560: {
			slidesPerView: 2,
			spaceBetween: 30
		},

		768: {
			slidesPerView: 3,
			spaceBetween: 40
		},

		1140: {
			slidesPerView: 3,
		},


		1280: {
			slidesPerView: 3,
			spaceBetween: 0
		},

		1480: {
			slidesPerView: 5,
		},
	}
});