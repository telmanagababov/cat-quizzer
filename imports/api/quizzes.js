import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import QuestionSchema from './quesionSchema';

export const Quizzes = new Mongo.Collection('quizzes');

if (Meteor.isServer) {
	Meteor.publish('quizzes', function () {
		return Quizzes.find();
	});
}

Meteor.methods({
	'quizzes.create'(title) {
		console.log("create: quizzes.create: ", title);
		check(title, String);
		return Quizzes.insert({
			title,
			questions: [],
			date: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});
	},
	'quizzes.add'(quizId, questionVO) {
		console.log("add: quizzes.add: ", quizId, questionVO);
		check(quizId, String);
		check(questionVO, QuestionSchema);
		Quizzes.update(quizId, { $push: {
			questions: questionVO
		} });
	},
	'quizzes.update.title'(quizId, title) {
		console.log("title: quizzes.update.title: ", quizId, title);
		check(quizId, String);
		check(title, String);
		Quizzes.update(quizId, { $set: {title} });
	},
	'quizzes.remove.question'(quizId, questionVO) {
		console.log("title: quizzes.remove.question: ", quizId, questionVO);
		check(quizId, String);
		check(questionVO, QuestionSchema);
		Quizzes.update(quizId, { $pull: {
			questions: questionVO
		} });
	},
	'quizzes.remove'(quizId) {
		console.log("remove: quizzes.remove: ", quizId);
		check(quizId, String);
		Quizzes.remove(quizId);
	}
});