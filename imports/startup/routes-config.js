import '../ui/dashboard/dashboard.js';
import '../ui/user-quizzes/userQuizzes.js';
import '../ui/create-form/createForm.js';

FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("main", {content: "dashboard"});
	}
});

FlowRouter.route('/dashboard', {
	action: function() {
		BlazeLayout.render("main", {content: "dashboard"});
	}
});

FlowRouter.route('/myquizzes', {
	action: function() {
		BlazeLayout.render("main", {content: "userQuizzes"});
	}
});

FlowRouter.route('/create', {
	action: function() {
		BlazeLayout.render("main", {content: "createForm"});
	}
});