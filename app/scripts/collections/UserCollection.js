define([
  'backbone',
  'models/UserModel',
  'config/paths'
],
function( Backbone, UserModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({

    model: UserModel,

    url: function() {return Paths.url + '/user';}
    
  });
});
