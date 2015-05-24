function add_class (el, clN) {
	el.className += ' ' + clN;
}

function remove_class (el, clN) {
	var elC = el.className;
	while(elC.indexOf(clN) !== -1) {
		elC = elC.replace(clN, '');
		elC = elC.trim();
	}
	el.className = elC;
}

function toggle_class (el, clN) {
	if (has_class(el, clN)) {
		remove_class(el, clN);
	} else {
		add_class(el, clN);
	}
}

function has_class (el, clN) {
	if (el.className.indexOf(clN) > -1) {
		return true;
	} else {
		return false;
	}
}

function is_overflowed(element){
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function toggle_modal_on () {
	var modal = document.getElementById(this.dataset.modal);
	toggle_class(modal, 'modal-hidden');
	toggle_class(modal, 'modal-shown');
}

function toggle_overlay () {
	var overlay = document.getElementsByClassName('modal-overlay')[0];
	toggle_class(overlay, 'modal-overlay-hidden');
}

function remap_modals () {
	var clickObjects = document.querySelectorAll('[data-modal]'),
	    allModals = document.getElementsByClassName('modal');

	// Hide all Modals
	for (var j = 0; j < allModals.length; j++) {
		add_class(allModals[j], 'modal-hidden');

		if (has_class(allModals[j], 'modal-closeable')) {

			var closeBtn = document.createElement('div');
			add_class(closeBtn, 'modal-close');
			closeBtn.addEventListener('click', function () {
				remove_class(this.parentNode, 'modal-shown');
				add_class(this.parentNode, 'modal-hidden');
				toggle_overlay();
			});

			allModals[j].appendChild(closeBtn);
		}
	}

	// Click events for modals
	for(var i = 0; i < clickObjects.length; i++) {
		clickObjects[i].addEventListener('click', toggle_modal_on, false);
		clickObjects[i].addEventListener('click', toggle_overlay, false);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	var overlay = document.createElement('div');

	// Add the required overlay classes
	overlay.className += "modal-overlay modal-overlay-hidden";

	// Add the overlay to the page
	document.getElementsByTagName('body')[0].appendChild(overlay);

	overlay.addEventListener('click', function () {
		var modal = document.getElementsByClassName('modal-shown')[0];
		add_class(overlay, 'modal-overlay-hidden');
		remove_class(modal, 'modal-shown');
		add_class(modal, 'modal-hidden');
	}, false);

	var scrollables = document.getElementsByClassName('modal-content-scrollable');

	for (var i = 0; i < scrollables.length; i++) {
		if(is_overflowed(scrollables[i])) {
			add_class(scrollables[i], 'modal-content-overflowed');
		}
	}

	remap_modals();
}, false);