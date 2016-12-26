import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './createForm.html';
import './createForm.css';
import './createFormTitle.js';
import './createFormQuestion.js';

let instance = null,
	quizId = null;

Template.createForm.onCreated(function () {
	instance = Template.instance();
	this.state = new ReactiveDict();
});

Template.createForm.helpers({
	title() {
		return instance.state.get('title');
	},
	isTitleSet() {
		return instance.state.get('isTitleSet');
	},
	onTitleSet() {
		return function(title) {
			Meteor.call('quizzes.create', title, function(error, result) {
				quizId = result;
			});
			instance.state.set('title', title);
			instance.state.set('isTitleSet', true);
		};
	},
	onQuestionAdded() {
		return function(vo) {
			Meteor.call('quizzes.add', quizId, vo);
		};
	},
	onCompleted() {
		return function(vo) {
			if(vo.isValid() === true) {
				Meteor.call('quizzes.add', quizId, vo);
			}
			FlowRouter.go("myquizzes");
		};
	},
	not(value) {
		return !value;
	}
});

Template.createForm.events({

});
