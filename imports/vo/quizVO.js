import {Meteor} from 'meteor/meteor';

export default class QuizVO {
	constructor(title, userId) {
		this.title = title;
		this.owner = userId;

		this.questions = [];
		this.records = [];
		this.date = new Date();
		this.username = Meteor.users.findOne(userId).username;
	}
}