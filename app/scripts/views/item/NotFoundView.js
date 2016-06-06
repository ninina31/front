define([
  'backbone',
  'hbs!tmpl/item/404'
],
function( Backbone, NotFoundViewTmpl ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    template: NotFoundViewTmpl

  });

});
