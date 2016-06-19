define([
  'backbone',
  'collections/BaseCollection',
  'models/RolModel',
  'config/paths'
],
function( Backbone, BaseCollection, RolModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({

    model: RolModel,

    url: function() {return Paths.url + '/rol';}
    
  });
});
