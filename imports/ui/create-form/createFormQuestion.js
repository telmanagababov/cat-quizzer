import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './createFormQuestion.html';

const WRONG_ANSWERS_AMOUNT = 4,
	defaultWrongAnswers = Array.apply(null, new Array(WRONG_ANSWERS_AMOUNT));

let question = '',
	correctAnswer = '',
	wrongAnswers = defaultWrongAnswers.concat();

function switchToNextQuestion() {
	const instance = Template.instance();
	let questionIndex = instance.state.get('questionIndex');
	resetValues();
	instance.state.set('questionIndex', questionIndex + 1);
}

function resetValues() {
	const instance = Template.instance();
	instance.state.set('isInputValid', false);
	instance.state.set('questionIndex', 1);
	question = '';
	correctAnswer = '';
	wrongAnswers = defaultWrongAnswers.concat();
	$('input').toArray().forEach(node => node.value = '');
}

function isValidInput() {
	return question && question.length
		&& correctAnswer && correctAnswer.length
		&& wrongAnswers.every(answer => answer && answer.length);
}

Template.createFormQuestion.onCreated(function onCreateFormCreated() {
	this.state = new ReactiveDict();
	resetValues();
});

Template.createFormQuestion.helpers({
	title() {
		return this.title;
	},
	questionIndex() {
		const instance = Template.instance();
		return instance.state.get('questionIndex');
	},
	wrongAnswers() {
		return wrongAnswers;
	},
	isValidInput() {
		const instance = Template.instance();
		return instance.state.get('isValidInput');
	},
	not(value) {
		return !value;
	}
});

Template.createFormQuestion.events({
	'keyup #question-input'(event, instance) {
		question = event.target.value;
		instance.state.set('isValidInput', isValidInput());
	},
	'keyup #correct-answer-input'(event, instance) {
		correctAnswer = event.target.value;
		instance.state.set('isValidInput', isValidInput());
	},
	'keyup #wrong-answers-group .form-control' (event, instance) {
		let index = $(event.target).data('index');
		wrongAnswers[index] = event.target.value;
		instance.state.set('isValidInput', isValidInput());
	},
	'keyup #create-form-question' (event, instance) {
		let isValidInput = instance.state.get('isValidInput');
		if(event.keyCode === 13 && isValidInput === true) {
			switchToNextQuestion();
			this.onQuestionAdded();
		}
	},
	'click #next-question-control'() {
		switchToNextQuestion();
		this.onQuestionAdded();
	},
	'click #end-quiz-control'() {
		resetValues();
		this.onCompleted();
	}
});
