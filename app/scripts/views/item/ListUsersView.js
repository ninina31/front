define([
  'backbone',
  'hbs!tmpl/item/ListUsersView_tmpl',
  'models/UserModel',
  'collections/UserCollection',
],
function( Backbone, ListUsersviewTmpl, UserModel, UserCollection ) {
    'use strict';

  var permit = 13;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    events: {
      'click .btn-danger': 'deleteUser'
    },

    template: ListUsersviewTmpl,

    initialize: function() {
      _.bindAll(this, 'getUsersSuccess', 'onSaveSuccess', 'onSaveFail');
      this.collection = new UserCollection();
    },
    
    fetchContent: function () {
      this.collection.fetch({
        success: this.getUsersSuccess
      });
    },

    getUsersSuccess: function (models) {
      this.trigger('fetched', this);
    },

    deleteUser: function (event) {
      event.preventDefault();
      var id = event.currentTarget.dataset.userId;
      var model = this.collection.get(id);
      model.save({ is_active: false }, {
        success: this.onSaveSuccess,
        error: this.onSaveFail
      });
    },

    onSaveSuccess: function () {
      $('.alert.alert-danger').addClass('hidden');
      Backbone.history.loadUrl(Backbone.history.fragment);
    },

    onSaveFail: function () {
      $('.alert.alert-danger').removeClass('hidden');
    }

  });

});
