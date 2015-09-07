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

    render: function () {
      var that = this;
      this.model.fetch({
        success: function (model) {
          that.$el.html(that.template({test: model.get(0)}));
        }
      });
    },

    calculateScore: function () {
      var sum = _.reduce(Backbone.$('input, textarea'), function (memo, obj) {
        obj = $(obj);
        return parseInt(obj.val()) + memo;
      }, 0);
      Backbone.$('#score').html(sum + ' ptos');
    },

		/* on render callback */
		onRender: function() {}
	});

});
