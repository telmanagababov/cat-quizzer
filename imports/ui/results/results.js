import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Quizzes} from '../../api/quizzes';
import './results.html';
import './results.css';

const MAX_ITEMS = 10;
let instance = null,
	quizId = null;

function getTitle() {
	return instance.state.get('title');
}

function getRecords() {
	return instance.state.get('records');
}

function updateState() {
	let quizVO = Quizzes.findOne(quizId),
		title = quizVO.title,
		records = quizVO.records;
	records = records.sort((a, b) => b.points - a.points);
	records = records.splice(0, MAX_ITEMS);
	instance.state.set('title', title);
	instance.state.set('records', records);
}

Template.results.onCreated(function () {
	instance = Template.instance();
	quizId = FlowRouter.getParam('id');
	this.state = new ReactiveDict();
	Meteor.subscribe('quizzes', updateState);
});

Template.results.helpers({
	title() {
		return getTitle();
	},
	records() {
		return getRecords();
	},
	record(index) {
		return getRecords()[index];
	},
	recordUser(index) {
		return getRecords()[index].user;
	},
	recordPoints(index) {
		return getRecords()[index].points;
	}
});

Template.results.events({
	'click #done-results-quiz-control'() {
		FlowRouter.go('dashboard');
	}
});
