define([
  'backbone',
  'hbs!tmpl/item/ListUsersView_tmpl',
  'collections/UserCollection'
],
function( Backbone, ListUsersviewTmpl, UserCollection ) {
    'use strict';

  var permit = 13;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    template: ListUsersviewTmpl,

    initialize: function() {
      _.bindAll(this, 'getUsersSuccess');
      this.collection = new UserCollection();
    },
    
    fetchContent: function () {
      this.collection.fetch({
        success: this.getUsersSuccess
      });
    },

    getUsersSuccess: function (models) {
      this.trigger('fetched', this);
    }

  });

});
