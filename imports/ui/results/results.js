import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Quizzes} from '../../api/quizzes';
import './results.html';
import './results.css';

let instance = null,
	quizId = null;

Template.results.onCreated(function () {
	instance = Template.instance();
	quizId = FlowRouter.getParam('id');
	this.state = new ReactiveDict();
	Meteor.subscribe('quizzes', () => {
		this.state.set('quizVO', Quizzes.findOne(quizId));
	});
});

Template.results.helpers({
	title() {
		let quizVO = instance.state.get('quizVO');
		return quizVO ? quizVO.title : '';
	}
});

Template.results.events({
	'click #done-start-quiz-control'() {
		FlowRouter.go('dashboard');
	},
	'click #get-results-start-quiz-control'() {
		FlowRouter.go('results', {id: quizId});
	}
});
