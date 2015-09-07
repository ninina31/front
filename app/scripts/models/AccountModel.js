define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Accountmodel model");
		},

		defaults: {},

    url: 'http://178.62.240.195/account_register',

    });
});
