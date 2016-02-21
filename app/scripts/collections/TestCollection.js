define([
	'backbone',
  'models/TestModel',
  'config/paths'
],
function( Backbone, TestModel , Paths) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Testcollection collection");
		},

    model: TestModel,

    url: function() {return Paths.url + '/exams';}
	});
});
