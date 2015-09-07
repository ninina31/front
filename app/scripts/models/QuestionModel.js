define([
	'backbone',
  'collections/QuestionTypeCollection'
],
function( Backbone, QuestionTypeCollection ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Questionmodel model");
      this.set('question_type', new QuestionTypeCollection());
		},

		defaults: {},
    });
});
