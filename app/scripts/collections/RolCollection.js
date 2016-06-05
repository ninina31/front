define([
  'backbone',
  'models/RolModel',
  'config/paths'
],
function( Backbone, RolModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({

    model: RolModel,

    url: function() {return Paths.url + '/rol';}
    
  });
});
