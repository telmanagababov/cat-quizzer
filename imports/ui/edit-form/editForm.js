import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Quizzes} from '../../api/quizzes';
import './editForm.html';
import './editForm.css';

let instance = null,
	quizId = null;

Template.editForm.onCreated(function () {
	instance = Template.instance();
	quizId = FlowRouter.getParam('id');
	this.state = new ReactiveDict();
	Meteor.subscribe('quizzes', () => {
		this.state.set('quizVO', Quizzes.findOne(quizId));
	});
});

Template.editForm.helpers({
	title() {
		let quizVO = instance.state.get('quizVO');
		return quizVO ? quizVO.title : '';
	},
	questions() {
		let quizVO = instance.state.get('quizVO');
		return quizVO ? quizVO.questions : [];
	},
	question(index) {
		let quizVO = instance.state.get('quizVO'),
			questionVO = quizVO.questions[index];
		return questionVO ? questionVO.question : '';
	}
});

Template.editForm.events({
	'click #add-question-quiz-control'() {

	},
	'click #done-edit-quiz-control'() {
		let title = document.querySelector('#edit-quiz-name-input').value;
		Meteor.call('quizzes.update.title', quizId, title);
		FlowRouter.go('myquizzes');
	},
	'click #edit-form-content .remove-question-btn'(event) {
		let questionIndex = $(event.target).data('index'),
			questionVO = instance.state.get('quizVO').questions[questionIndex];
		Meteor.call('quizzes.remove.question', quizId, questionVO, () => {
			instance.state.set('quizVO', Quizzes.findOne(quizId));
		});
	},
	'click #edit-form-content .edit-question-btn'(event) {
		let questionId = $(event.target).data('index').toString();
		FlowRouter.go('editquestion', {quizId, questionId});
	}
});
