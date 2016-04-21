define([
  'backbone',
  'underscore',
  'hbs!tmpl/item/GetCompanyView_tmpl'
],
function( Backbone, _, GetCompanyviewTmpl ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a GetCompanyview ItemView");
      $('[data-toggle="popover"]').popover();
      _.bindAll(this, 'showCompany');
      this.model.fetch({
        success: this.showCompany
      });
    },
    
      template: GetCompanyviewTmpl,
        

      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {
      'click #deleteCompany': 'deleteCompany'
    },

    showCompany: function (model) {
      this.trigger('fetched', this);
      $('[data-toggle="popover"]').popover({ html: true });
    },

    deleteCompany: function () {
      this.model.destroy({
        method: 'DELETE',
        success: function () {
          Backbone.history.navigate("listarCompanias", {trigger: true});
        },
        error: function () {
          $('.alert.alert-danger').removeClass('hidden');
        }
      });
    }
    
  });

});
