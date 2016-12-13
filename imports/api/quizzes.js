import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import QuestionSchema from './quesionSchema';

export const Quizzes = new Mongo.Collection('quizzes');

if (Meteor.isServer) {
	Meteor.publish('quizzes', function onQuizzesPublished () {
		return Quizzes.find();
	});
}

Meteor.methods({
	'quizzes.create'(title) {
		console.log("create: quizzes.create: ", title);
		check(title, String);
		Quizzes.insert({
			title,
			date: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});
	},
	'quizzes.add'(title, question) {
		console.log("add: quizzes.add: ", title, question);
		check(title, String);
		check(question, QuestionSchema);
	},
	'quizzes.remove'(quizId) {
		console.log("remove: quizzes.remove: ", quizId);
		check(quizId, String);
		Quizzes.remove(quizId);
	}
});