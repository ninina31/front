define([
	'backbone',
  'models/QuestionTypeModel'
],
function( Backbone, QuestionTypeModel ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Questiontypecollection collection");
		},
    model: QuestionTypeModel,
    url: 'http://178.62.240.195/question_type'
	});
});
