define([
  'backbone',
  'collections/BaseCollection',
  'config/paths'
],
function( Backbone, BaseCollection, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({

    url: function() {return Paths.url + '/rol_permit';}
    
  });
});
