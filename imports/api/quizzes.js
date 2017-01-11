import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import QuestionSchema from './quesionSchema';
import QuizVO from '../vo/quizVO'
import ResultVO from '../vo/resultVO'
import RecordVO from '../vo/recordVO'

export const Quizzes = new Mongo.Collection('quizzes');

if (Meteor.isServer) {
	Meteor.publish('quizzes', function () {
		return Quizzes.find();
	});
}

Meteor.methods({
	'quizzes.create'(title) {
		check(title, String);
		return Quizzes.insert(new QuizVO(title, this.userId));
	},
	'quizzes.add'(quizId, questionVO) {
		check(quizId, String);
		check(questionVO, QuestionSchema);
		Quizzes.update(quizId, { $push: {
			questions: questionVO
		} });
	},
	'quizzes.update.title'(quizId, title) {
		check(quizId, String);
		check(title, String);
		Quizzes.update(quizId, { $set: {title} });
	},
	'quizzes.update.question'(quizId, questionId, questionVO) {
		check(quizId, String);
		check(questionId, Number);
		check(questionVO, QuestionSchema);
		let questions = Quizzes.findOne(quizId).questions;
		questions[questionId] = questionVO;
		Quizzes.update(quizId, { $set: {
			questions: questions
		} });
	},
	'quizzes.remove.question'(quizId, questionVO) {
		check(quizId, String);
		check(questionVO, QuestionSchema);
		Quizzes.update(quizId, { $pull: {
			questions: questionVO
		} });
	},
	'quizzes.remove'(quizId) {
		check(quizId, String);
		Quizzes.remove(quizId);
	},
	'quizzes.submit' (quizId, answers) {
		check(quizId, String);
		check(answers, [String]);
		let resultVO = generateResultVO(quizId, answers),
			recordVO = new RecordVO(Meteor.users.findOne(this.userId).username, resultVO.total);
		Quizzes.update(quizId, { $push: {
			records: recordVO
		} });
		return resultVO;
	}
});

function generateResultVO(quizId, answers) {
	let resultVO = new ResultVO(),
		questions = Quizzes.findOne(quizId).questions;
	questions.forEach((questionVO, index) => {
		resultVO.add(questionVO.question, answers[index], questionVO.correctAnswer === answers[index]);
	});
	return resultVO;
}