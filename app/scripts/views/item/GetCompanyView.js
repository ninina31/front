define([
  'backbone',
  'underscore',
  'hbs!tmpl/item/GetCompanyView_tmpl'
],
function( Backbone, _, GetCompanyviewTmpl ) {
    'use strict';

  var permit = 18;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    initialize: function() {
      $('[data-toggle="popover"]').popover();
      _.bindAll(this, 'showCompany');
    },
    
    template: GetCompanyviewTmpl,

    /* Ui events hash */
    events: {
      'click #deleteCompany': 'deleteCompany'
    },

    fetchContent: function () {
      this.model.fetch({
        success: this.showCompany
      });
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
