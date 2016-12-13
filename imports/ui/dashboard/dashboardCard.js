import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import './dashboardCard.html';

Template.dashboardCard.helpers({
	isOwner() {
		return this.owner === Meteor.userId();
	}
});

Template.dashboardCard.events({
	'click #dashboard-card-start'() {
		console.log("start: ", this._id);
	},
	'click #dashboard-card-edit'() {
		console.log("edit: ", this._id);
	},
	'click #dashboard-card-remove'() {
		Meteor.call('quizzes.remove', this._id);
	}
});
