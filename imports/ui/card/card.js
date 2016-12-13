import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import './card.html';
import './card.css';

Template.card.helpers({
	isOwner() {
		return this.owner === Meteor.userId();
	}
});

Template.card.events({
	'click #card-start'() {
		console.log("start: ", this._id);
	},
	'click #card-edit'() {
		console.log("edit: ", this._id);
		FlowRouter.go('edit', {id: this._id});
	},
	'click #card-remove'() {
		Meteor.call('quizzes.remove', this._id);
	}
});
