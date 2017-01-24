import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import QuestionVO from '../../vo/questionVO';
import './createFormQuestion.html';

let instance = null,
	vo = null;

function resetQuestion() {
	instance.state.set('isInputValid', false);
	$('input').toArray().forEach(node => node.value = '');
	vo = new QuestionVO();
}

function switchToNextQuestion() {
	let questionIndex = instance.state.get('questionIndex');
	instance.state.set('questionIndex', questionIndex + 1);
	resetQuestion();
}

Template.createFormQuestion.onCreated(function onCreateFormCreated() {
	instance = Template.instance();
	this.state = new ReactiveDict();
	instance.state.set('questionIndex', 1);
	resetQuestion();
});

Template.createFormQuestion.helpers({
	title() {
		return this.title;
	},
	questionIndex() {
		return instance.state.get('questionIndex');
	},
	wrongAnswers() {
		return vo.wrongAnswers;
	},
	isValidInput() {
		return instance.state.get('isValidInput');
	},
	not(value) {
		return !value;
	}
});

Template.createFormQuestion.events({
	'keyup #question-input'(event) {
		vo.question = event.target.value;
		instance.state.set('isValidInput', vo.isValid());
	},
	'keyup #correct-answer-input'(event) {
		vo.correctAnswer = event.target.value;
		instance.state.set('isValidInput', vo.isValid());
	},
	'keyup #wrong-answers-group .form-control' (event) {
		let index = $(event.target).data('index');
		vo.wrongAnswers[index] = event.target.value;
		instance.state.set('isValidInput', vo.isValid());
	},
	'keyup #create-form-question' (event) {
		let isValidInput = instance.state.get('isValidInput');
		if(event.keyCode === 13 && isValidInput === true) {
			this.onQuestionAdded(vo);
			switchToNextQuestion();
		}
	},
	'click #next-question-control'() {
		this.onQuestionAdded(vo);
		switchToNextQuestion();
	},
	'click #end-quiz-control'() {
		this.onCompleted(vo);
	}
});
