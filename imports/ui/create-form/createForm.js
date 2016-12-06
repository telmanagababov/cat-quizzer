import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './createForm.html';
import './createForm.css';
import './createFormTitle.js';
import './createFormQuestion.js';

Template.createForm.onCreated(function onCreateFormCreated() {
	this.state = new ReactiveDict();
});

Template.createForm.helpers({
	onTitleSet() {
		const instance = Template.instance();
		return function(title) {
			instance.state.set('title', title);
			instance.state.set('isTitleSet', true);
		};
	},
	title() {
		const instance = Template.instance();
		return instance.state.get('title');
	},
	isTitleSet() {
		const instance = Template.instance();
		return instance.state.get('isTitleSet');
	},
	onQuestionAdded() {
		return function() {
			console.log("onQuestionAdded");
		};
	},
	onCompleted() {
		return function() {
			console.log("onCompleted");
			FlowRouter.go("/myquizzes");
		};
	},
	not(value) {
		return !value;
	}
});

Template.createForm.events({

});
