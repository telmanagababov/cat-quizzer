import '../ui/content-forms/dashboard.js';
import '../ui/content-forms/user-quizzes.js';
import '../ui/content-forms/create-form.js';

FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("content", {content: "dashboard"});
	}
});

FlowRouter.route('/dashboard', {
	action: function() {
		BlazeLayout.render("content", {content: "dashboard"});
	}
});

FlowRouter.route('/myquizzes', {
	action: function() {
		BlazeLayout.render("content", {content: "user-quizzes"});
	}
});

FlowRouter.route('/create', {
	action: function() {
		BlazeLayout.render("content", {content: "create-form"});
	}
});