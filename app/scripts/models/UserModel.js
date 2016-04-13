define([
  'backbone',
  'config/paths'
],
function( Backbone, Paths ) {
    'use strict';

  /* Return a model class definition */
  var user = Backbone.Model.extend({

    urlRoot: function(){ return Paths.url + '/user';}

    });

  return user;
});
