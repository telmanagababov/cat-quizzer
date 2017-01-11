import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import {Quizzes} from '../../api/quizzes';
import QuestionVO from '../../vo/questionVO';
import './editQuestionForm.css';
import './editQuestionForm.html';

let instance = null,
	quizId = null,
	quizVO = null,
	questionId = null,
	questionVO = null;

function updateQuestion() {
	Meteor.call('quizzes.update.question', quizId, questionId, questionVO);
}

Template.editQuestionForm.onCreated(function () {
	instance = Template.instance();
	quizId = FlowRouter.getParam('quizId');
	questionId = parseInt(FlowRouter.getParam('questionId'));
	this.state = new ReactiveDict();
	Meteor.subscribe('quizzes', () => {
		quizVO = Quizzes.findOne(quizId);
		questionVO = new QuestionVO(quizVO.questions[questionId]);
		this.state.set('title', quizVO.title);
		this.state.set('questionId', questionId + 1);
		this.state.set('questionVO', questionVO);
		this.state.set('isValidInput', questionVO.isValid());
	});
});

Template.editQuestionForm.helpers({
	title() {
		return instance.state.get('title');
	},
	questionId() {
		return instance.state.get('questionId');
	},
	question() {
		return instance.state.get('questionVO')
			? instance.state.get('questionVO').question
			: '';
	},
	correctAnswer() {
		return instance.state.get('questionVO')
			? instance.state.get('questionVO').correctAnswer
			: '';
	},
	wrongAnswers() {
		return instance.state.get('questionVO')
			? instance.state.get('questionVO').wrongAnswers
			: [];
	},
	wrongAnswer(index) {
		return instance.state.get('questionVO').wrongAnswers[index];
	},
	isValidInput() {
		return instance.state.get('isValidInput');
	},
	not(value) {
		return !value;
	}
});

Template.editQuestionForm.events({
	'keyup #question-input'(event) {
		questionVO.question = event.target.value;
		instance.state.set('isValidInput', questionVO.isValid());
	},
	'keyup #correct-answer-input'(event) {
		questionVO.correctAnswer = event.target.value;
		instance.state.set('isValidInput', questionVO.isValid());
	},
	'keyup #wrong-answers-group .form-control' (event) {
		let index = $(event.target).data('index');
		questionVO.wrongAnswers[index] = event.target.value;
		instance.state.set('isValidInput', questionVO.isValid());
	},
	'keyup #edit-question-form' (event) {
		if(event.keyCode === 13) {
			let isValidInput = instance.state.get('isValidInput');
			if(isValidInput === true) {
				updateQuestion();
			}
			FlowRouter.go('edit', {id: quizId});
		}
	},
	'click #cancel-quiz-control'() {
		FlowRouter.go('edit', {id: quizId});
	},
	'click #end-quiz-control'() {
		updateQuestion();
		FlowRouter.go('edit', {id: quizId});
	}
});
