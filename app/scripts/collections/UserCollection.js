define([
  'backbone',
  'collections/BaseCollection',
  'models/UserModel',
  'config/paths'
],
function( Backbone, BaseCollection, UserModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({

    model: UserModel,

    url: function() {return Paths.url + '/user';}
    
  });
});
