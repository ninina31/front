define([
  'backbone',
  'models/UserModel',
  'config/paths'
],
function( Backbone, UserModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a UserCollection collection");
    },

    model: UserModel,

    url: function() {return Paths.url + '/user';}
  });
});
