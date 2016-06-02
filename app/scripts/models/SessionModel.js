define([
  'backbone',
  'models/BaseModel',
  'config/paths'
],
function( Backbone, BaseModel, Paths ) {
    'use strict';

  /* Return a model class definition */
  var session = BaseModel.extend({

    urlRoot: function(){ return Paths.url + '/user/login';}

  });

  return new session();
});
