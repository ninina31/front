define([
  'backbone',
  'models/UserModel',
  'collections/RolCollection',
  'collections/CompanyCollection',
  'hbs!tmpl/item/AddUserView_tmpl'
],
function( Backbone, UserModel, RolCollection, CompanyCollection, AddUserView_tmpl ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      this.model = new UserModel();
      console.log("initialize a AddUserview ItemView");
      _.bindAll(this, 'renderCollection', 'onSaveSuccess', 'onSaveFail');
      this.companies = new CompanyCollection();
      this.rol = new RolCollection();
      Backbone.$.when(this.companies.fetch(), this.rol.fetch()).done(this.renderCollection);
    },
    
    template: AddUserView_tmpl,

    /* ui selector cache */
    ui: {
      form: '#addUser',
      saveButton: '#saveUser'
    },

    /* Ui events hash */
    events: {
      'click #saveUser': 'addUser'
    },
    
    renderCollection: function (collection) {
      this.model.set({companies: this.companies.toJSON()});
      this.model.set({rols: this.rol.toJSON()});
      this.trigger('fetched', this);
    },

    addUser: function (e) {
      e.preventDefault();
      this.$el.find('.alert.alert-danger').addClass('hidden');
      this.$el.find('#passwordsError').addClass('hidden');
      this.$el.find('#passwordsLengthError').addClass('hidden');
      this.$el.find('.alert.alert-success').addClass('hidden');
      if(this.hasEmptyInputs()){
        return false;
      };
      if(!this.matchPasswords()){
        this.$el.find('#passwordsError').removeClass('hidden');
        return false;
      };
      if(!this.checkLengthPassword()){
        this.$el.find('#passwordsLengthError').removeClass('hidden');
        return false;
      };
      var info = $('form').serializeObject();
      this.model.unset('companies');
      this.model.unset('rols');
      info.isActive = true;
      this.model.save(info,
      {
        type: 'post',
        contentType: "application/json",
        success: this.onSaveSuccess, 
        error: this.onSaveFail
      });
    },

    onSaveSuccess: function (model, response, options) {
      this.$el.find('.alert.alert-danger').addClass('hidden');
      this.$el.find('#passwordsError').addClass('hidden');
      this.$el.find('#passwordsLengthError').addClass('hidden');
      this.$el.find('.alert.alert-success').removeClass('hidden');
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

    matchPasswords: function() {
      var password = this.$el.find('input[name="password"]');
      var repeat_password = this.$el.find('input[name="repeat_password"]');
      return password.val() === repeat_password.val();
    },

    checkLengthPassword: function() {
      var password = this.$el.find('input[name="password"]');
      return password.val().length >= 8;
    }
  });

});
