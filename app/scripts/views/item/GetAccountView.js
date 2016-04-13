define([
  'backbone',
  'underscore',
  'hbs!tmpl/item/GetAccountView_tmpl'
],
function( Backbone, _, GetaccountviewTmpl ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a Getaccountview ItemView");
      $('[data-toggle="popover"]').popover();
      _.bindAll(this, 'showAccount');
      this.model.fetch({
        success: this.showAccount
      });
    },
    
      template: GetaccountviewTmpl,
        

      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {
      'click #deleteAccount': 'deleteAccount'
    },

    showAccount: function (model) {
      this.trigger('fetched', this);
      $('[data-toggle="popover"]').popover({ html: true });
    },

    deleteAccount: function () {
      this.model.destroy({
        method: 'DELETE',
        success: function () {
          Backbone.history.navigate("listarCuentas", {trigger: true});
        },
        error: function () {
          $('.alert.alert-danger').removeClass('hidden');
        }
      });
    }
    
  });

});
