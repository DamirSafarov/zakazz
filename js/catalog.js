document.querySelector('.selection-filter').addEventListener('click', function () {
	document.querySelector('.wrapper-filters').classList.add('active');
	document.querySelector("html").classList.add("lock");
})

document.querySelector('.catalog-filters__cross').addEventListener('click', function () {
	document.querySelector('.wrapper-filters').classList.remove('active');
	document.querySelector("html").classList.remove("lock");
})


window.addEventListener('click', function(event){
	if (event.target == document.querySelector('.wrapper-filters')) {
		document.querySelector('.wrapper-filters').classList.remove('active');
		document.querySelector("html").classList.remove("lock");
	}
})
