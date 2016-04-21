define([
  'backbone',
  'config/paths'
],
function( Backbone, Paths ) {
    'use strict';

  /* Return a model class definition */
  var session = Backbone.Model.extend({

  urlRoot: function(){ return Paths.url + '/login';}

  });

  return session;
});
