define([
	'backbone',
  'config/paths'
],
function( Backbone, Paths ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Testformmodel model");
		},

		defaults: {},

    url: function() {return Paths.url + '/exam_register';}

    });
});
