define([
  'backbone',
  'config/paths'
],
function( Backbone, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({

    url: function() {return Paths.url + '/rol_permit';}
  });
});
