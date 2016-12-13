import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './editForm.html';
import './editForm.css';

let instance = null;

Template.editForm.onCreated(function () {
	instance = Template.instance();
	this.state = new ReactiveDict();
});

Template.editForm.helpers({
});

Template.editForm.events({

});
