import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Quizzes} from '../../api/quizzes';
import '../card/card.js';
import './userQuizzes.html';

let instance = null;

Template.userQuizzes.onCreated(function () {
	instance = Template.instance();
	Meteor.subscribe('quizzes');
});

Template.userQuizzes.helpers({
	quizzes() {
		return Quizzes.find({owner: {$eq: Meteor.userId()}}).fetch();
	},
});

Template.userQuizzes.events({

});
