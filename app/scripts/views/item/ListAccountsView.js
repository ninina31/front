define([
  'backbone',
  'hbs!tmpl/item/ListAccountsView_tmpl',
  'collections/AccountCollection'
],
function( Backbone, ListaccountsviewTmpl, AccountCollection ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a ListAccountView ItemView");
      _.bindAll(this, 'getAccountsSuccess');
      this.collection = new AccountCollection();
      this.collection.fetch({
        success: this.getAccountsSuccess
      });
    },
    
      template: ListaccountsviewTmpl,
        
      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {},

    getAccountsSuccess: function (models) {
      this.trigger('fetched', this);
    },

    /* on render callback */
    onRender: function() {}
  });

});
