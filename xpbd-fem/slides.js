const Settings_ElementTypeBit = 0;
const Settings_ElementTypeMask = (1 << 4) - 1;
const Settings_ConstructBlockFromSettings = (1 << 4);
const Settings_ForceResetBlock = (1 << 5);
const Settings_EnergyBit = 6;
const Settings_EnergyMask = (1 << 3) - 1;
const Settings_ShapeBit = 9;
const Settings_ShapeMask = (1 << 4) - 1;
const Settings_ConstraintOrderBit = 13;
const Settings_ConstraintOrderMask = (1 << 2) - 1;
const Settings_SimultaneousXpbd = (1 << 15);
const Settings_LockLeft = (1 << 16);
const Settings_LockRight = (1 << 17);
const Settings_RotateLock = (1 << 18);
const Settings_RenderHigherOrderFeatures = (1 << 19);

const Element_Null = 0;
const Element_T3 = 1;
const Element_Q4 = 2;
const Element_Q5 = 3;
const Element_Q9 = 4;
const Element_H8 = 5;
const Element_H27 = 6;

const Energy_NeoHookean = 0;
const Energy_PreintegratedNeoHookean = 1;
const Energy_StableNeoHookean = 2;
const Energy_UnderIntegratedNeoHookean = 3;

const Shape_Single = 0;
const Shape_Line = 1;
const Shape_BeamL = 2;
const Shape_BeamM = 3;
const Shape_BeamH = 4;
const Shape_BoxL = 5;
const Shape_BoxM = 6;
const Shape_BoxH = 7;

var settings = {
	stepsPerSecond: 1800.0,
	timeScale: 1.0,
	gravity: 0.02,
	compliance: 0.00001,
	damping: 0.0,
	drag: 0.0,
	poissonsRatio: 0.45,
	volumeConservationMult: 0.5,
	wonkiness: 0.0,
	flags: Settings_ConstructBlockFromSettings |
		(Element_Q9 << Settings_ElementTypeBit) |
		(Energy_PreintegratedNeoHookean << Settings_EnergyBit) |
		(Shape_BeamM << Settings_ShapeBit) |
		Settings_SimultaneousXpbd |
		Settings_LockLeft |
		Settings_RenderHigherOrderFeatures,
};
var settings1 = JSON.parse(JSON.stringify(settings));

function updateSettings(simIdx) {
	let pushSettings = simIdx ? settings1 : settings;
	rpc('UpdateSettings',
		simIdx ? 1 : 0,
		pushSettings.stepsPerSecond,
		pushSettings.timeScale,
		pushSettings.gravity,
		pushSettings.compliance,
		pushSettings.damping,
		pushSettings.drag,
		pushSettings.poissonsRatio,
		pushSettings.volumeConservationMult,
		pushSettings.wonkiness,
		pushSettings.flags
	);
}

function resetBlocks() {
	settings.flags |= Settings_ForceResetBlock;
	settings1.flags |= Settings_ForceResetBlock;
	updateSettings(0);
	updateSettings(1);
	settings.flags &= ~Settings_ForceResetBlock;
	settings1.flags &= ~Settings_ForceResetBlock;
}

function addElement(parentElement, type, className) {
	let element = document.createElement(type);
	if (className) {
		element.className = className;
	}
	parentElement.appendChild(element);
	return element;
}
function addLabel(parentElement, className, text) {
	let label = addElement(parentElement, 'label', className);
	label.innerHTML = text;
	return label;
}
function addInput(parentElement, className, type) {
	let input = addElement(parentElement, 'input', className);
	input.type = type;
	return input;
}

class CheckboxControl {
	constructor(parentElement, flag, label) {
		this.flag = flag;
		this.onchange = null;

		this.rootElement = addElement(parentElement, 'div', 'control-input-bag');
		let labelNode = addLabel(this.rootElement, 'control-input-bag-contents', label);
		this.checkbox = addInput(labelNode, '', 'checkbox');
		this.checkbox.addEventListener('change', () => {
			if (this.onchange) { this.onchange(this.checkbox.checked); }
		});
	}
	storeState() {
		return this.checkbox.checked;
	}
	loadState(state) {
		this.checkbox.checked = state;
	}
	storeToSettings(settings) {
		let changed = this.checkbox.checked != !!(settings.flags & this.flag);
		if (this.checkbox.checked) {
			settings.flags |= this.flag;
		} else {
			settings.flags &= ~this.flag;
		}
		return changed;
	}
	loadFromSettings(settings) {
		let changed = this.checkbox.checked != !!(settings.flags & this.flag);
		this.checkbox.checked = !!(settings.flags & this.flag);
		return changed;
	}
}

class RadioButtonsControl {
	constructor(parentElement, flagBit, flagMask, name, labels) {
		this.flagBit = flagBit;
		this.flagMask = flagMask;
		this.onchange = null;

		this.rootElement = addElement(parentElement, 'div', 'control-input-bag');
		this.buttons = [];
		labels.forEach(label => {
			let labelNode = addLabel(this.rootElement, 'control-input-bag-contents', label);
			let button = addInput(labelNode, '', 'radio');
			button.name = name;
			button.value = this.buttons.length;
			button.addEventListener('change', () => {
				if (this.onchange) { this.onchange(button.value); }
			});
			this.buttons.push(button);
		});
	}
	storeState() {
		for (let i = 0; i < this.buttons.length; i++) {
			if (this.buttons[i].checked) { return i; }
		}
		return 0;
	}
	loadState(state) {
		this.buttons[state].checked = true;
	}
	storeToSettings(settings) {
		let setting = (settings.flags >> this.flagBit) & this.flagMask;
		let changed = !this.buttons[setting].checked;
		for (let i = 0; i < this.buttons.length; i++) {
			if (this.buttons[i].checked) {
				settings.flags &= ~(this.flagMask << this.flagBit);
				settings.flags |= i << this.flagBit;
				break;
			}
		}
		return changed;
	}
	loadFromSettings(settings) {
		let setting = (settings.flags >> this.flagBit) & this.flagMask;
		let changed = !this.buttons[setting].checked;
		this.buttons[setting].checked = true;
		return changed;
	}
}

class RangeWithTextFieldControl {
	constructor(parentElement, setting, min, max, rangeToTextValueFn) {
		this.setting = setting;
		this.value = 0.0;
		this.onchange = null;

		this.rootElement = addElement(parentElement, 'div', 'control-input-slider');
		let label0 = addLabel(this.rootElement, 'control-input-slider', '');
		this.range = addInput(label0, 'control-range', 'range');
		this.min = min;
		this.max = max;
		this.step = 'any';
		this.value = this.value;
		let label1 = addLabel(this.rootElement, '', '');
		this.text = addInput(label1, 'control-range-text', 'text');
		this.text.value = rangeToTextValueFn(this.value);

		this.formatValueForText = (value) => {
			let str = ''+value;
			let strBuilder = [];
			let firstSigIdx = 100000;
			let decimalIdx = 100000;
			for (let i = 0; i < str.length; i++) {
				if (i < firstSigIdx && str[i] >= '1' && str[i] <= '9') { firstSigIdx = i; }
				if (i < decimalIdx && str[i] == '.') { decimalIdx = i; ++firstSigIdx; }
				if (i >= decimalIdx && i > firstSigIdx + 1) { break; }
				strBuilder.push(i < firstSigIdx + 2 ? str[i] : '0');
			}
			if (strBuilder[strBuilder.length - 1] == '.') { strBuilder.pop(); }
			return strBuilder.join('');
		};
		this.searchValueForRange = (value) => {
			let low = min;
			let high = max;
			let guess = 0.5 * (low + high);
			for (let itr = 0; itr < 32; itr++) {
				if (value < rangeToTextValueFn(guess)) {
					high = guess;
				} else {
					low = guess;
				}
				guess = 0.5 * (low + high);
			}
			return guess;
		};
		this.range.addEventListener('input', () => {
			let value = rangeToTextValueFn(this.range.value);
			this.text.value = this.formatValueForText(value);
			this.value = parseFloat(this.text.value);
			if (this.onchange) { this.onchange(this.value); }
		});
		this.text.addEventListener('change', () => {
			let isNumeric = !isNaN(this.text.value) && !isNaN(parseFloat(this.text.value));
			if (!isNumeric) { return; }
			this.value = parseFloat(this.text.value);
			this.range.value = this.searchValueForRange(this.value);
			if (this.onchange) { this.onchange(this.value); }
		});
	}
	storeState() {
		return { value: this.value, range: this.range.value, text: this.text.value };
	}
	loadState(state) {
		this.value = state.value;
		this.range.value = state.range;
		this.text.value = state.text;
	}
	storeToSettings(settings) {
		let changed = settings[this.setting] != this.value;
		settings[this.setting] = this.value;
		return changed;
	}
	loadFromSettings(settings) {
		let changed = this.value != settings[this.setting];
		this.value = settings[this.setting];
		this.text.value = this.formatValueForText(this.value);
		this.range.value = this.searchValueForRange(this.value);
		return changed;
	}
}

function addControl(parentElement, label, createControlFn) {
	let row = addElement(parentElement, 'div', 'control-row');
	let labelNode = addElement(row, 'div', 'control-label');
	labelNode.innerHTML = label;

	let inputArea = addElement(row, 'div', 'control-input-area');

	let ctrl0 = createControlFn(inputArea, 0);
	ctrl0.loadFromSettings(settings);

	let link = addElement(inputArea, 'div', 'control-link');
	let linkLabel = addLabel(link, 'link-toggle', '');
	let linkCheckbox = addInput(linkLabel, 'link-toggle', 'checkbox');
	let linkText = addElement(linkLabel, 'span', 'link-text');

	let ctrl1 = createControlFn(inputArea, 1);
	ctrl1.loadFromSettings(settings1);

	let undoState = null;

	ctrl0.onchange = (value) => {
		let changed = ctrl0.storeToSettings(settings);
		if (changed) { updateSettings(0); console.log(0, label, ctrl0.storeState()); }
		if (linkCheckbox.checked) {
			ctrl1.loadState(ctrl0.storeState());
			undoState = ctrl1.storeState();
			let changed1 = ctrl1.storeToSettings(settings1);
			if (changed1) { updateSettings(1); console.log(1, label, ctrl1.storeState()); }
		}
	};
	ctrl1.onchange = (value) => {
		undoState = ctrl1.storeState();
		let changed = ctrl1.storeToSettings(settings1);
		if (changed) { updateSettings(1); console.log(1, label, ctrl1.storeState()); }
		// Disable the link
		linkCheckbox.checked = false;
		ctrl1.rootElement.classList.remove('control-input-linked');
	};

	// Set up the link checkbox functionality
	linkCheckbox.addEventListener('change', () => {
		if (linkCheckbox.checked) {
			ctrl1.rootElement.classList.add('control-input-linked');
			ctrl1.loadState(ctrl0.storeState());
		} else {
			ctrl1.rootElement.classList.remove('control-input-linked');
			if (undoState) { ctrl1.loadState(undoState); }
		}
		let changed1 = ctrl1.storeToSettings(settings1);
		if (changed1) { updateSettings(1); console.log(1, label, 'link', ctrl1.storeState()); }
	});
}

function addCheckbox(parentElement, label, flag, checkboxLabel) {
	addControl(parentElement, label, (parent, side) => {
		return new CheckboxControl(parent, flag, checkboxLabel);
	});
}

function addRadioButtons(parentElement, label, flagBit, flagMask, buttonLabels) {
	addControl(parentElement, label, (parent, side) => {
		return new RadioButtonsControl(parent, flagBit, flagMask, label+side, buttonLabels);
	});
}

function addRangeWithTextField(parentElement, label, setting, min, max, rangeToTextValueFn) {
	addControl(parentElement, label, (parent, side) => {
		return new RangeWithTextFieldControl(parent, setting, min, max, rangeToTextValueFn);
	});
}

var slides = [];
var currentSlide = -1;
function gotoSlide(slideIdx) {
	if (currentSlide == slideIdx) { return; }
	if (slideIdx < 0 || slideIdx > slides.length - 1) { return; }
	currentSlide = slideIdx;

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = i == currentSlide ? 'block' : 'none';
	}

	rpc('ResetDemo');
	slideFns[currentSlide]();
	rpc('FinishAddingBlocks');
}

document.addEventListener('DOMContentLoaded', function(event) {
	// Gather all the slide dom elements
	slidesChildren = document.getElementById('slides').childNodes;
	for (let i = 0; i < slidesChildren.length; i++) {
		if (slidesChildren[i].className == 'slide') {
			slides.push(slidesChildren[i]);
		}
	}

	// Add table of contents entries for all the slides
	let toc = document.getElementById('toc');
	function addTocEntry(label, onclick) {
		let span = document.createElement('span');
		let text = document.createTextNode(label);
		span.appendChild(text);
		toc.appendChild(span);
		span.className = 'toc-entry';
		span.addEventListener('click', onclick);
	}
	addTocEntry('<', () => gotoSlide(currentSlide - 1));
	for (let i = 0; i < slides.length; i++) {
		addTocEntry(''+(i + 1), ((idx) => () => gotoSlide(idx))(i));
	}
	addTocEntry('>', () => gotoSlide(currentSlide + 1));

	// Support navigating through slides with the keyboard
	document.addEventListener('keydown', function(event) {
		// We never want to look at input if the user is typing in a text box
		if (document.activeElement.tagName.toLowerCase() == 'input' &&
			document.activeElement.type.toLowerCase() == 'text') { return; }

		if (event.key.toUpperCase() == 'R') {
			resetBlocks();
		}

		// Furthermore, certain inputs we don't want to look at if the user has anything selected
		if (document.activeElement != document.body) { return; }

		if (event.key == 'ArrowLeft' || event.key == 'ArrowRight') {
			if (event.key == 'ArrowLeft') {
				gotoSlide(currentSlide - 1);
			} else if (event.key == 'ArrowRight') {
				gotoSlide(currentSlide + 1);
			}
			event.preventDefault();
		}
	}, true);

	//
	gotoSlide(0);
});
