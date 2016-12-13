export default QuestionSchema = new SimpleSchema({
	question: {
		type: String,
		label: 'Title'
	},
	correctAnswer: {
		type: String,
		label: 'Correct Answer'
	},
	wrongAnswers: {
		type: [String]
	}
})