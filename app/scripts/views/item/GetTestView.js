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
      _.bindAll(this, "renderView", "onDeleteSuccess", "onDeleteFail");
      this.model.fetch({
        success: this.renderView
      });
		},
		
    	template: GettestviewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
      'click #deleteExam': 'deleteExam'
    },

    renderView: function(){
      this.trigger('fetched', this);
      $('[data-toggle="popover"]').popover({ html: true });
    },

    deleteExam: function () {
      this.model.destroy({
        method: 'DELETE',
        success: this.onDeleteSuccess,
        fail: this.onDeleteFail
      });
    },

    onDeleteSuccess: function () {
      Backbone.history.navigate('', {trigger: true});
    },

    onDeleteFail: function () {
      $('.alert.alert-danger').removeClass('hidden');
    }
    
	});

});
