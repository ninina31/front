define([
	'backbone',
  'models/QuestionModel',
  'config/paths'
],
function( Backbone, QuestionModel, Paths ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Questioncollection collection");
		},

    model: QuestionModel,

    url: function() {return Paths.url + '/questions';},

    save: function (options) {
      Backbone.sync('save', this, options);
    }
	});
});
