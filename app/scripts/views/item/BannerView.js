define([
  'backbone',
  'hbs!tmpl/item/BannerView_tmpl'
],
function( Backbone, BannerviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    template: BannerviewTmpl

  });

});
