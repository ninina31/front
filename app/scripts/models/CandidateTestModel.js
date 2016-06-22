define([
  'backbone',
  'models/BaseModel',
  'config/paths'
],
function( Backbone, BaseModel, Paths ) {
    'use strict';

  /* Return a model class definition */
  return BaseModel.extend({

    urlRoot: function() {return Paths.url + '/candidatetests';},

    });
});
