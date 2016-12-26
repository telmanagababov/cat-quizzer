export default class ResultVO {
	constructor() {
		this.questions = [];
		this.answers = [];
		this.results = [];
		this.total = 0;
	}

	add(question, answer, result) {
		this.questions.push(question);
		this.answers.push(answer);
		this.results.push(result);
		this.total = result ? this.total + 1 : this.total;
	}
}