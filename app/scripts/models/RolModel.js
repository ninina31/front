define([
  'backbone'
],
function( Backbone ) {
    'use strict';

  /* Return a model class definition */
  return Backbone.Model.extend({
    initialize: function() {
      console.log("initialize a Rol model");
    },
    
    urlRoot: function() {return Paths.url + '/rol';}

    });
});
