define([
	'backbone',
	'hbs!tmpl/item/NavBarView_tmpl'
],
function( Backbone, NavbarviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Navbarview ItemView");
		},
		
    	template: NavbarviewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
