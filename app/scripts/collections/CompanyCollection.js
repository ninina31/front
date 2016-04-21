define([
  'backbone',
  'models/CompanyModel',
  'config/paths'
],
function( Backbone, CompanyModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a CompanyCollection collection");
    },

    model: CompanyModel,

    url: function() {return Paths.url + '/company ';}
  });
});
