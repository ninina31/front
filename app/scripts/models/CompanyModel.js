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
      console.log("initialize a Companymodel model");
    },

    defaults: {},

    urlRoot: function() {return Paths.url + '/company';}

    });
});
