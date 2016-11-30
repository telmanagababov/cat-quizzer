import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './create-form.html';

const WRONG_ANSWERS_AMOUNT = 4,
	defaultWrongAnswers = Array.apply(null, new Array(WRONG_ANSWERS_AMOUNT));

Template['create-form'].onCreated(function onCreateFormCreated() {
	this.state = new ReactiveDict();
	const instance = Template.instance();
	return instance.state.set('wrongAnswers', defaultWrongAnswers.concat());
});

Template['create-form'].helpers({
	title() {
		const instance = Template.instance();
		return instance.state.get('title');
	},
	isTitleSet() {
		const instance = Template.instance();
		return instance.state.get('isTitleSet');
	},
	isCompleted() {
		const instance = Template.instance();
		return instance.state.get('isCompleted');
	},
	question() {
		const instance = Template.instance();
		return instance.state.get('question');
	},
	correctAnswer() {
		const instance = Template.instance();
		return instance.state.get('correctAnswer');
	},
	wrongAnswer(index) {
		const instance = Template.instance();
		return instance.state.get('wrongAnswers')[index];
	},
	wrongAnswers() {
		const instance = Template.instance();
		return instance.state.get('wrongAnswers');
	},
	isAllQuestionFieldsFilled() {
		const instance = Template.instance();
		let question = instance.state.get('question'),
			correctAnswer = instance.state.get('correctAnswer'),
			wrongAnswers = instance.state.get('wrongAnswers');
		return question && question.length
			&& correctAnswer && correctAnswer.length
			&& wrongAnswers.every(answer => answer && answer.length);
	},
	isEmpty(value) {
		return value === undefined || value === null || value === "";
	},
	not(value) {
		return !value;
	}
});

Template['create-form'].events({
	'keyup #create-quiz-input'(event, instance) {
		instance.state.set('title', event.target.value);
	},
	'click #create-quiz-control'(event, instance) {
		instance.state.set('isTitleSet', true);
	},
	'keyup #question-input'(event, instance) {
		instance.state.set('question', event.target.value);
	},
	'keyup #correct-answer-input'(event, instance) {
		instance.state.set('correctAnswer', event.target.value);
	},
	'keyup #wrong-answers-group .form-control' (event, instance) {
		let index = $(event.target).data('index'),
			wrongAnswers = instance.state.get('wrongAnswers');
		wrongAnswers[index] = event.target.value;
		instance.state.set('wrongAnswers', wrongAnswers);
	},
	'click #next-question-control'(event, instance) {
		instance.state.set('question', '');
		instance.state.set('correctAnswer', '');
		instance.state.set('wrongAnswers', defaultWrongAnswers.concat());
	},
	'click #end-quiz-control'(event, instance) {
		instance.state.set('isCompleted', true);
	}
});
