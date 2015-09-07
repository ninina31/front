define([
	'backbone',
  'models/QuestionModel'
],
function( Backbone, QuestionModel ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Questioncollection collection");
		},

    model: QuestionModel
	});
});
