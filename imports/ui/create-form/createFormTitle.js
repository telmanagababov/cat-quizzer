import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './createFormTitle.html';

let inputValue = '';

function isValidInput () {
	return inputValue !== undefined && inputValue !== null && inputValue !== "";
}

Template.createFormTitle.onCreated(function () {
	this.state = new ReactiveDict();
});

Template.createFormTitle.helpers({
	isValidInput() {
		const instance = Template.instance();
		return instance.state.get('isValidInput');
	},
	not(value) {
		return !value;
	}
});

Template.createFormTitle.events({
	'keyup #create-quiz-input'(event, instance) {
		inputValue = event.target.value;
		instance.state.set('isValidInput', isValidInput());
		if(event.keyCode === 13 && instance.state.get('isValidInput') === true) {
			this.onTitleSet(inputValue);
		}
	},
	'click #create-quiz-control'(event, instance) {
		this.onTitleSet(inputValue);
	}
});
