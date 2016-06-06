define([
  'backbone',
  'underscore',
  'models/SessionModel',
  'models/ApikeyModel',
  'hbs!tmpl/item/GenerateApikeyView_tmpl'
],
function( Backbone, _, sessionModel, ApikeyModel, GenerateApikeyviewTmpl ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    model: ApikeyModel,

    initialize: function() {
      var id_user = sessionModel.get('id');
      this.model = new ApikeyModel({id_user: id_user});
    },
    
    template: GenerateApikeyviewTmpl,

    /* ui selector cache */
    ui: {
      '#generateApikey': 'generateApikey',
      '.alert.alert-success': 'successMessage',
      '.alert.alert-danger': 'errorMessage'
    },

    /* Ui events hash */
    events: {
      'click this.ui.generateApikey': 'generateApikey'
    },

    generateApikey: function () {
      this.model.save(null, {
        success: this.successGenerateApikey,
        error: this.errorGenerateApikey
      });
    },

    successGenerateApikey: function () {
      this.ui.successMessage.removeClass('hidden');
    },

    errorGenerateApikey: function () {
      this.ui.errorMessage.removeClass('hidden');
    }

  });

});
