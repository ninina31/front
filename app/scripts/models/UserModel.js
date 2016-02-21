define([
  'backbone',
  'config/paths'
],
function( Backbone, Paths ) {
    'use strict';

  /* Return a model class definition */
  return Backbone.Model.extend({
    initialize: function() {
      console.log("initialize a Usermodel model");
    },

    defaults: {
      type: 'visitor'
    },

    url: function(){ return Paths.url + '/user';}

    });
});
