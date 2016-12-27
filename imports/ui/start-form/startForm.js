import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Quizzes} from '../../api/quizzes';
import QuestionVO from '../../vo/questionVO';
import './startForm.html';
import './startForm.css';

let instance = null,
	quizId = null,
	currentAnswers = [],
	userInput = [];

function getCurrentQuestion() {
	let quizVO = instance.state.get('quizVO'),
		questionId = instance.state.get('questionId');
	return quizVO ? quizVO.questions[questionId] : new QuestionVO();
}

function generateAnswers() {
	let generatedAnswers = [],
		currentQuestion = getCurrentQuestion();
	if(currentQuestion.correctAnswer) {
		generatedAnswers = currentQuestion.wrongAnswers.concat();
		generatedAnswers.push(currentQuestion.correctAnswer);
		generatedAnswers.sort(() => Math.random() > 0.5 ? 1 : - 1);
	}
	return generatedAnswers;
}

Template.startForm.onCreated(function () {
	instance = Template.instance();
	quizId = FlowRouter.getParam('id');
	this.state = new ReactiveDict();
	this.state.set('questionId', 0);
	Meteor.subscribe('quizzes', () => {
		this.state.set('quizVO', Quizzes.findOne(quizId));
	});
});

Template.startForm.helpers({
	title() {
		let quizVO = instance.state.get('quizVO');
		return quizVO ? quizVO.title : '';
	},
	questionId() {
		return instance.state.get('questionId') + 1;
	},
	question() {
		return getCurrentQuestion().question;
	},
	answers() {
		if(currentAnswers.length === 0) {
			currentAnswers = generateAnswers();
		}
		return currentAnswers;
	},
	answer(index) {
		return currentAnswers[index];
	},
	hasResult() {
		return instance.state.get('resultVO');
	},
	resultQuestions() {
		return instance.state.get('resultVO').questions;
	},
	resultAnswers() {
		return instance.state.get('resultVO').answers;
	},
	resultResults() {
		return instance.state.get('resultVO').results;
	},
	resultResult(index) {
		let result = instance.state.get('resultVO').results[index];
		return result ? 'correct' : 'incorrect';
	},
	resultTotal() {
		return instance.state.get('resultVO').total;
	}
});

Template.startForm.events({
	'click .answer-start-quiz button'(event) {
		let quizVO = instance.state.get('quizVO'),
			questionIndex = instance.state.get('questionId'),
			answerIndex = $(event.target).data('index');
		userInput.push(currentAnswers[answerIndex]);
		if(questionIndex === quizVO.questions.length -1) {
			Meteor.call('quizzes.submit', quizId, userInput, function (error, result) {
				instance.state.set('resultVO', result);
				console.log("resultVO: ", result);
			})
		} else {
			currentAnswers = [];
			instance.state.set('questionId', questionIndex + 1);
		}
	},
	'click #done-start-quiz-control'() {
		FlowRouter.go('dashboard');
	},
	'click #get-results-start-quiz-control'() {
		FlowRouter.go('results', {id: quizId});
	}
});
