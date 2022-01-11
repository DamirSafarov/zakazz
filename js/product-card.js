var swiper = new Swiper(".cardSwiper", {
    slidesPerView: 1,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".thumbSwiper", {
    spaceBetween: 10,
    thumbs: {
        swiper: swiper,
    },
});


var swiper = new Swiper(".rewiewsSwiper", {
	cssMode: true,
	slidesPerView: 1,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

});

