define([
	'backbone',
	'hbs!tmpl/item/addQuestionView_tmpl'
],
function( Backbone, AddquestionviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Addquestionview ItemView");
		},
		
    	template: AddquestionviewTmpl,
        
    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
