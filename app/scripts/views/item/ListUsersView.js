define([
  'backbone',
  'hbs!tmpl/item/ListUsersView_tmpl',
  'collections/UserCollection'
],
function( Backbone, ListUsersviewTmpl, UserCollection ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a ListUsersview ItemView");
      _.bindAll(this, 'getUsersSuccess');
      this.collection = new UserCollection();
      this.collection.fetch({
        success: this.getUsersSuccess
      });
    },
    
      template: ListUsersviewTmpl,
        
      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {},

    getUsersSuccess: function (models) {
      this.trigger('fetched', this);
    },

    /* on render callback */
    onRender: function() {}
  });

});
