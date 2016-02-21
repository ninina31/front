define([
  'backbone',
  'models/AnwerModel',
  'config/paths'
],
function( Backbone, AnwerModel, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a Anwsercollection collection");
    },
    model: AnwerModel,
    url: function() {return Paths.url + '/anwsers';}
  });
});
