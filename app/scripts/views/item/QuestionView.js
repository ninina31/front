define([
	'backbone',
	'hbs!tmpl/item/QuestionView_tmpl'
],
function( Backbone, QuestionviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Questionview ItemView");
		},
		
    	template: QuestionviewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
