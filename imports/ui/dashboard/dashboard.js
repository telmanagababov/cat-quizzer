import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Quizzes} from '../../api/quizzes';
import './dashboardCard.js';
import './dashboard.html';
import './dashboard.css';

let instance = null;

Template.dashboard.onCreated(function () {
	instance = Template.instance();
	Meteor.subscribe('quizzes');
});

Template.dashboard.helpers({
	quizzes() {
		console.log("dashboard: quizzes: ", Quizzes.find({}).fetch());
		return Quizzes.find({}).fetch();
	},
});

Template.dashboard.events({

});
