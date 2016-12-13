import '../ui/dashboard/dashboard.js';
import '../ui/user-quizzes/userQuizzes.js';
import '../ui/create-form/createForm.js';
import '../ui/edit-form/editForm.js';
import '../ui/not-found-info/notFoundInfo.js';

FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("main", {content: "dashboard"});
	}
});

FlowRouter.route('/dashboard', {
	name: 'dashboard',
	action: function() {
		BlazeLayout.render("main", {content: "dashboard"});
	}
});

FlowRouter.route('/myquizzes', {
	name: 'myquizzes',
	action: function() {
		BlazeLayout.render("main", {content: "userQuizzes"});
	}
});

FlowRouter.route('/create', {
	name: 'create',
	action: function() {
		BlazeLayout.render("main", {content: "createForm"});
	}
});

FlowRouter.route('/edit/:id', {
	name: 'edit',
	action: function() {
		BlazeLayout.render("main", {content: "editForm"});
	}
});

FlowRouter.notFound = {
	action() {
		BlazeLayout.render('main', {content: 'notFoundInfo'});
	}
};