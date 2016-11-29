import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './body.html';
import './header.js';
import './content.js';

Template.body.onCreated(function bodyOnCreated() {
});

Template.body.helpers({
});

Template.body.events({
});