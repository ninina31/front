define([
  'backbone',
  'models/AccountModel',
  'config/paths'
],
function( Backbone, AccountModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a AccountCollection collection");
    },

    model: AccountModel,

    url: function() {return Paths.url + '/accounts ';}
  });
});
