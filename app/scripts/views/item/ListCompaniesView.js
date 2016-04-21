define([
  'backbone',
  'hbs!tmpl/item/ListCompaniesView_tmpl',
  'collections/CompanyCollection'
],
function( Backbone, ListCompaniesviewTmpl, CompanyCollection ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a ListCompanyView ItemView");
      _.bindAll(this, 'getCompaniesSuccess');
      this.collection = new CompanyCollection();
      this.collection.fetch({
        success: this.getCompaniesSuccess
      });
    },
    
      template: ListCompaniesviewTmpl,
        
      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {},

    getCompaniesSuccess: function (models) {
      this.trigger('fetched', this);
    },

    /* on render callback */
    onRender: function() {}
  });

});
