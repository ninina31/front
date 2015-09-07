define([
	'backbone',
  'underscore',
  'models/AccountModel',
	'hbs!tmpl/item/AccountView_tmpl'
],
function( Backbone, _, AccountModel, AccountviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

    className: 'container',

		initialize: function() {
			console.log("initialize a Accountview ItemView");
		},
		
    	template: AccountviewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
      'click #saveAccount': 'addAccount'  
    },

    addAccount: function (e) {
      e.preventDefault();
      var info = $('#addAccount').serializeObject();
      this.model = new AccountModel(info);
      this.model.save({}, 
      {
        type: 'post',
        contentType: "application/json",
        success: this.onSaveSuccess, 
        error: this.onSaveFail
      });
    },

    onSaveSuccess: function (model, response, options) {
      $('.alert.alert-success').removeClass('hidden');
      $('form')[0].reset();
    },

    onSaveFail: function (model, xhr, options) {
      $('.alert.alert-danger').removeClass('hidden');
    },

		/* on render callback */
		onRender: function() {}
	});

});
