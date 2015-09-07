define([
	'backbone',
  'models/TestModel'
],
function( Backbone, TestModel ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Testcollection collection");
		},

    model: TestModel,

    url: 'http://178.62.240.195/exam'
	});
});
