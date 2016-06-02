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
      console.log("initialize a Candidatetestmodel model");
    },

    defaults: {},

    urlRoot: function() {return Paths.url + '/candidatetests';},

    parse: function (response) {
      return { id: response.message };
    }

    });
});
