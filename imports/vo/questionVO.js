const WRONG_ANSWERS_AMOUNT = 4,
	DEFAULT_WRONG_ANSWERS = Array.apply(null, new Array(WRONG_ANSWERS_AMOUNT));

export default class QuestionVO {
	constructor(questionVO) {
		if(questionVO) {
			this.question = questionVO.question;
			this.correctAnswer = questionVO.correctAnswer;
			this.wrongAnswers = questionVO.wrongAnswers;
		} else {
			this.reset();
		}
	}

	reset() {
		this.question = '';
		this.correctAnswer = '';
		this.wrongAnswers = DEFAULT_WRONG_ANSWERS.concat();
	}

	isValid() {
		return this.question && this.question.length > 0
			&& this.correctAnswer && this.correctAnswer.length > 0
			&& this.wrongAnswers.every(answer => answer && answer.length) === true;
	}
}