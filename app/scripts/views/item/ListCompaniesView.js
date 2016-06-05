define([
  'backbone',
  'hbs!tmpl/item/ListCompaniesView_tmpl',
  'collections/CompanyCollection'
],
function( Backbone, ListCompaniesviewTmpl, CompanyCollection ) {
    'use strict';

  var permit = 4;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    initialize: function() {
      _.bindAll(this, 'getCompaniesSuccess');
      this.collection = new CompanyCollection();
      this.collection.fetch({
        success: this.getCompaniesSuccess
      });
    },
    
    template: ListCompaniesviewTmpl,

    getCompaniesSuccess: function (models) {
      this.trigger('fetched', this);
    }

  });

});
