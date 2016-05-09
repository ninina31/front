define([
  'backbone',
  'underscore',
  'models/UserModel',
  'collections/CompanyCollection',
  'hbs!tmpl/item/UserViewForm_tmpl'
],
function( Backbone, _, UserModel, CompanyCollection, UserviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a EditUserview ItemView");
      _.bindAll(this, 'renderCollection', 'onSaveSuccess', 'onSaveFail');
      this.collection = new CompanyCollection();
      this.collection.fetch({
        success: this.renderCollection
      });
    },
    
    template: UserviewTmpl,

    /* ui selector cache */
    ui: {
      form: '#editUser',
      saveButton: '#saveUser'
    },

    /* Ui events hash */
    events: {
      'click #saveUser': 'editUser'
    },

    renderCollection: function (collection) {
      var that = this;
      this.model.set('items', collection.toJSON());
      this.model.fetch({
        success: function () {
          that.trigger('fetched', that);
        }
      });
    },

    editUser: function (e) {
      e.preventDefault();
      if(this.hasEmptyInputs()){
        return false;
      };
      var info = $('form').serializeObject();
      delete info.repeat_password;
      this.model.set(info);
      this.model.unset('items');
      this.model.save({},
      {
        type: 'put',
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
    }
  });

});
