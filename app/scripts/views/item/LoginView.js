define([
	'backbone',
	'hbs!tmpl/item/LoginView_tmpl'
],
function( Backbone, LoginviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

    className: 'container',

		initialize: function() {
			console.log("initialize a Loginview ItemView");
		},
		
    	template: LoginviewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
