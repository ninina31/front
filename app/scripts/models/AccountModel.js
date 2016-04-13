define([
	'backbone',
  'config/paths'
],
function( Backbone, Paths ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Accountmodel model");
		},

		defaults: {},

    urlRoot: function() {return Paths.url + '/accounts';}

    });
});
