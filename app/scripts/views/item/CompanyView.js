define([
  'backbone',
  'underscore',
  'models/CompanyModel',
  'hbs!tmpl/item/CompanyView_tmpl'
],
function( Backbone, _, CompanyModel, CompanyviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a Companyview ItemView");
    },
    
      template: CompanyviewTmpl,
        

      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {
      'click #saveCompany': 'addCompany'  
    },

    addCompany: function (e) {
      e.preventDefault();
      var info = $('#addCompany').serializeObject();
      this.model = new CompanyModel(info);
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
