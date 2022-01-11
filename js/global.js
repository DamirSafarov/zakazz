var swiper = new Swiper(".productsSwiper", {
	cssMode: true,
	slidesPerView: 5,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	mousewheel: true,
	breakpoints: {

		320: {
			slidesPerView: 2,
			spaceBetween: 10
		},

		480: {
			slidesPerView: 2,
			spaceBetween: 10
		},

		560: {
			slidesPerView: 3,
			spaceBetween: 10
		},

		768: {
			slidesPerView: 4,
			spaceBetween: 10
		},

		1024: {
			slidesPerView: 4,
			spaceBetween: 10
		},

		1800: {
			slidesPerView: 5,
		},
	}
});





//Select

let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}

function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}

function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}

function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}

function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}

function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}

function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}

function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}

function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}


let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'flex';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}



// Добавление хедеру класс при прокрутке

window.onscroll = function () {
	let header = document.querySelector('header');

	if (window.pageYOffset > 115) {
		header.classList.add('fixed')
	} else {
		header.classList.remove('fixed')
	}
}

// Продукты

const favouriteButtons = document.querySelectorAll('.products-item__favourite')
favouriteButtons.forEach(function (favouriteButton) {
	favouriteButton.addEventListener('click', function () {
		favouriteButton.classList.toggle('active')
	})
})



// Мобильное меню



const burgerMob = document.querySelectorAll('.mobile-burger')
burgerMob.forEach(function (burgerButton) {
	burgerButton.addEventListener('click', function () {
		document.querySelector(".menu").classList.add("active");
		document.querySelector("html").classList.add("lock");
	})
})



document.getElementById('menu-close').addEventListener('click', function () {
	document.querySelector('.menu').classList.remove('active');
	document.querySelector("html").classList.remove("lock");
})


// Добавление в корзину

function startTimer() {
	var timer;

	const addCart = document.querySelectorAll('.product-details__add-cart')
	addCart.forEach(function (cartButton) {
		cartButton.addEventListener('click', function () {
			document.querySelector(".cart-popup").classList.add("active");
			timer = setTimeout(function () {
				document.querySelector(".cart-popup").classList.remove('active');
			}, 3000);
		})
	})

	var cartPopup = document.querySelector(".cart-popup");

	cartPopup.addEventListener('mouseover', function () {
		clearTimeout(timer);
	})

	cartPopup.addEventListener('mouseout', function () {
		timer = setTimeout(function () {
			document.querySelector(".cart-popup").classList.remove('active');
		}, 3000);
	})

}

startTimer();




document.querySelector('.cart-popup__btn').addEventListener('click', function () {
	document.querySelector('.cart-popup').classList.remove('active');
})


// Поисковое окно

const searchButton = document.querySelectorAll('.header-details__search')
searchButton.forEach(function (searchClick) {
	searchClick.addEventListener('click', function () {
		document.querySelector(".cart-popup").classList.remove('active');
		document.querySelector(".search-window").classList.add("active");
		document.querySelector("html").classList.add("lock");
	})
})


document.querySelector('.search-block__close').addEventListener('click', function () {
	document.querySelector('.search-window').classList.remove('active');
	document.querySelector("html").classList.remove("lock");
})


window.addEventListener('click', function (event) {
	if (event.target == document.querySelector('.search-window')) {
		document.querySelector('.search-window').classList.remove('active');
		document.querySelector("html").classList.remove("lock");
	} else if (event.target.classList.contains('popup')) {
		document.querySelectorAll('.popup').forEach(el => {
			el.classList.remove('active')
		})
		document.querySelector('html').classList.remove('lock')
	} else if (event.target == document.querySelector('.menu')) {
		document.querySelector('.menu').classList.remove('active');
		document.querySelector("html").classList.remove("lock");
	}
})



const closeList = document.querySelectorAll('.menu-list__cross')
closeList.forEach(function (closeButton) {
	closeButton.addEventListener('click', function () {
		document.querySelector(".popup.active").classList.remove("active")
		document.querySelector("html").classList.remove("lock")
	})
})



// Попапы (Вход, Регистрация)

const accLogin = document.querySelectorAll('.account-login')
accLogin.forEach(function (accButton) {
	accButton.addEventListener('click', function () {
		document.querySelector(".search-window").classList.remove("active")
		document.getElementById("popup-login").classList.add("active")
		document.querySelector("html").classList.add("lock")
	})
})

const accReg = document.querySelectorAll('.register')
accReg.forEach(function (regButton) {
	regButton.addEventListener('click', function () {
		document.querySelector(".search-window").classList.remove("active")
		document.querySelector(".menu").classList.remove("active")
		document.getElementById("popup-register").classList.add("active")
		document.querySelector("html").classList.add("lock")
	})
})

const accSucces = document.querySelectorAll('.succes')
accSucces.forEach(function (succesButton) {
	succesButton.addEventListener('click', function () {
		document.querySelector(".search-window").classList.remove("active")
		document.getElementById("popup-succesful").classList.add("active")
		document.querySelector("html").classList.add("lock")
	})
})


const popupClose = document.querySelectorAll('.popup-inner__close')
popupClose.forEach(function (closeButton) {
	closeButton.addEventListener('click', function () {
		document.querySelector(".popup.active").classList.remove("active")
		document.querySelector("html.lock").classList.remove("lock")
	})
})





// accordion 

const accordions = document.querySelectorAll(".accordion");

const openAccordion = (accordion) => {
	const content = accordion.querySelector(".accordion-list");
	accordion.classList.add("accordion__active");
	content.style.maxHeight = content.scrollHeight + "px";
};

const closeAccordion = (accordion) => {
	const content = accordion.querySelector(".accordion-list");
	accordion.classList.remove("accordion__active");
	content.style.maxHeight = null;
};

accordions.forEach((accordion) => {
	const intro = accordion.querySelector(".accordion__title");
	const content = accordion.querySelector(".accordion-list");

	intro.onclick = () => {
		if (content.style.maxHeight) {
			closeAccordion(accordion);
		} else {
			accordions.forEach((accordion) => closeAccordion(accordion));
			openAccordion(accordion);
		}
	};
});



// tabs 


let tab = document.querySelectorAll('.tab-header'),
	tabContent = document.querySelectorAll('.tab-content');

tab.forEach(function (tab, i) {
	tab.addEventListener('click', function () {
		hideTab();
		this.classList.add('tab-header_show');
		tabContent[i].classList.add('tab-content_show');
	});
});

function hideTab() {
	tab.forEach((item) => {
		item.classList.remove('tab-header_show');
	});
	tabContent.forEach((item) => {
		item.classList.remove('tab-content_show');
	});
}