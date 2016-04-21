define([
  'backbone',
  'underscore',
  'models/ReviewerModel',
  'collections/CompanyCollection',
  'hbs!tmpl/item/ReviewerViewForm_tmpl'
],
function( Backbone, _, ReviewerModel, CompanyCollection, ReviewerviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a AddReviewerview ItemView");
      _.bindAll(this, "renderCollection", "onSaveSuccess", "onSaveFail");
      this.collection = new CompanyCollection();
      this.collection.fetch({
        success: this.renderCollection
      });
    },
    
    template: ReviewerviewTmpl,

    /* ui selector cache */
    ui: {
      form: '#addReviewer',
      saveButton: '#saveReviewer'
    },

    /* Ui events hash */
    events: {
      'click #saveReviewer': 'addReviewer'
    },

    renderCollection: function (collection) {
      this.trigger('fetched', this);
    },

    addReviewer: function (e) {
      e.preventDefault();
      if(this.hasEmptyInputs()){
        return false;
      };
      var info = $('form').serializeObject();
      this.model = new ReviewerModel(info);
      this.model.save({}, 
      {
        type: 'post',
        contentType: "application/json",
        success: this.onSaveSuccess, 
        error: this.onSaveFail
      });
    },

    onSaveSuccess: function (model, response, options) {
      $('.alert.alert-danger').addClass('hidden');
      $('.alert.alert-success').removeClass('hidden');
      $('form')[0].reset();
    },

    onSaveFail: function (model, xhr, options) {
      $('.alert.alert-danger').removeClass('hidden');
    },

    hasEmptyInputs: function () {
      var empty = this.ui.form.find("textarea, input:not([type=checkbox])").filter(function() {
        return this.value === "";
      });
      var not_empty = this.ui.form.find("textarea, input:not([type=checkbox])").filter(function() {
        return this.value != "";
      });
      $('.js-empty').addClass('hidden');
      not_empty.closest('.form-group').removeClass('has-error');
      if(empty.length) {
        $('.js-empty').removeClass('hidden');
        empty.closest('.form-group').addClass('has-error');
        return true;
      }
      return false;
    },

    /* on render callback */
    onRender: function() {
    }
  });

});
