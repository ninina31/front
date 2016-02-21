define([
	'backbone',
  'underscore',
	'hbs!tmpl/item/GetTestView_tmpl'
],
function( Backbone, _, GettestviewTmpl ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

    className: 'container',

		initialize: function() {
			console.log("initialize a Gettestview ItemView");
		},
		
    	template: GettestviewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

    onBeforeRender: function () {
      var byQuestion = _.groupBy(_.flatten(this.model.get('proposedAnswer')), function (obj) {
        return obj.question.id;
      });
      var questions = _.map(this.model.get('questions'), function (obj) {
        obj.proposed_answer = byQuestion[obj.id];
        return obj;
      });
    }
    
	});

});
