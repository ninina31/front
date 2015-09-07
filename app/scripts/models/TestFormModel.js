define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Testformmodel model");
		},

		defaults: {},

    url: 'http://178.62.240.195/exam_register'

    });
});
