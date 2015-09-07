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
      _.bindAll(this, 'successGetTest');
		},
		
    	template: GettestviewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

    successGetTest: function (model) {
      var byQuestion = _.groupBy(_.flatten(model.get(2)), function (obj) {
        return obj.question.id;
      });
      var questions = _.map(model.get(1), function (obj) {
        obj.proposed_answer = byQuestion[obj.id];
        return obj;
      })
      this.$el.html(this.template({test: model.get(0), questions: questions}));
    },

    render: function () {
      var that = this;
      this.model.fetch({
        success: this.successGetTest
      });
    }
	});

});
