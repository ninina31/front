define([
	'backbone',
	'hbs!tmpl/item/ReviewTestView_tmpl'
],
function( Backbone, ReviewtestviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

    className: 'container',

		initialize: function() {
			console.log("initialize a Reviewtestview ItemView");
		},
		
    	template: ReviewtestviewTmpl,

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
      'keyup input, textarea': 'calculateScore',
      'click input, textarea': 'calculateScore'
    },

    calculateScore: function () {
      var sum = _.reduce(Backbone.$('input, textarea'), function (memo, obj) {
        obj = $(obj);
        return parseInt(obj.val()) + memo;
      }, 0);
      Backbone.$('#score').html(sum + ' ptos');
    },

		/* on render callback */
		onRender: function() {
       var byQuestion = _.groupBy(_.flatten(this.model.get('proposedAnswer')), function (obj) {
        return obj.question.id;
      });
      var questions = _.map(this.model.get('questions'), function (obj) {
        obj.proposed_answer = byQuestion[obj.id];
        return obj;
      });
      // TODO: agregar la parte de la respuesta del candidato
    }
	});

});
