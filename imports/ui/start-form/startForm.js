import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Quizzes} from '../../api/quizzes';
import QuestionVO from '../../vo/questionVO';
import './startForm.html';
import './startForm.css';

const MAX_TIME = 10,
	TIME_LEFT_UPDATE_DELAY = 250;
let instance = null,
	quizId = null,
	currentAnswers = [],
	userInput = [],
	timeStart = 0,
	timeProgressInterval = 0;

function getCurrentQuestion() {
	let quizVO = instance.state.get('quizVO'),
		questionId = instance.state.get('questionId');
	return quizVO ? quizVO.questions[questionId] : new QuestionVO();
}

function generateAnswers() {
	let generatedAnswers = [],
		currentQuestion = getCurrentQuestion();
	if(currentQuestion.correctAnswer) {
		let correctAnswerIndex = Math.round(Math.random() * currentQuestion.wrongAnswers.length);
		generatedAnswers = currentQuestion.wrongAnswers.concat();
		generatedAnswers.splice(correctAnswerIndex, 0, currentQuestion.correctAnswer);
	}
	return generatedAnswers;
}

function progressTimeLeft() {
	let timeSpent = Date.now() - timeStart,
		timeLeft = MAX_TIME - timeSpent / 1000,
		progress = parseInt(timeLeft / MAX_TIME * 100);
	if(progress > 0) {
		instance.state.set('timeLeft', progress);
	} else {
		answer('incorrect-answer');
	}
}

function restart() {
	currentAnswers = [];
	timeStart = Date.now();
	instance.state.set('timeLeft', 100);
	clearInterval(timeProgressInterval);
	timeProgressInterval = setInterval(progressTimeLeft, TIME_LEFT_UPDATE_DELAY);
}

function answer(currentAnswer) {
	let quizVO = instance.state.get('quizVO'),
		questionIndex = instance.state.get('questionId');
	userInput.push(currentAnswer);
	restart();
	if(questionIndex === quizVO.questions.length -1) {
		Meteor.call('quizzes.submit', quizId, userInput, function (error, result) {
			instance.state.set('resultVO', result);
		})
	} else {
		instance.state.set('questionId', questionIndex + 1);
	}
}

Template.startForm.onCreated(function () {
	instance = Template.instance();
	quizId = FlowRouter.getParam('id');
	this.state = new ReactiveDict();
	this.state.set('questionId', 0);
	Meteor.subscribe('quizzes', () => {
		restart();
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
	},
	timeLeft() {
		return instance.state.get('timeLeft');
	}
});

Template.startForm.events({
	'click .answer-start-quiz button'(event) {
		let answerIndex = $(event.target).data('index');
		answer(currentAnswers[answerIndex]);
	},
	'click #done-start-quiz-control'() {
		restart();
		FlowRouter.go('dashboard');
	},
	'click #get-results-start-quiz-control'() {
		restart();
		FlowRouter.go('results', {id: quizId});
	}
});
