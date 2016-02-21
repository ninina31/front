define([
  'backbone',
  'underscore',
  'models/UserModel',
  'hbs!tmpl/item/AddReviewerView_tmpl'
],
function( Backbone, _, UserModel, ReviewerviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a AddReviewerview ItemView");
    },
    
      template: ReviewerviewTmpl,
        

      /* ui selector cache */
      ui: {
        saveButton: '#saveReviewer'
      },

    /* Ui events hash */
    events: {
      'click this.ui.saveButton': 'addReviewer'
    },

    addReviewer: function (e) {
      e.preventDefault();
      var info = $('#addUser').serializeObject();
      this.model = new UserModel(info);
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
