define([
  'backbone',
  'models/BaseModel',
  'config/paths'
],
function( Backbone, BaseModel, Paths ) {
    'use strict';

  /* Return a model class definition */
  return BaseModel.extend({
    initialize: function() {
      console.log("initialize a User model");
    },
    
    urlRoot: function() {return Paths.url + '/user';},

    defaults: {
      isActive: false
    }

    });
});
