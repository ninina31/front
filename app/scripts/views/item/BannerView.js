define([
  'backbone',
  'hbs!tmpl/item/BannerView_tmpl'
],
function( Backbone, BannerviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    initialize: function() {
      console.log("initialize a Bannerview ItemView");
    },
    
      template: BannerviewTmpl,
        

      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {},

    /* on render callback */
    onRender: function() {}
  });

});
