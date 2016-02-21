define([
	'backbone',
  'config/paths'
],
function( Backbone, Paths ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Questionsformmodel model");
		},

		defaults: {},

    url: function() {return Paths.url + '/question_register';}

    });
});
