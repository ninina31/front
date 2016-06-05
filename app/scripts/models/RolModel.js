define([
  'backbone',
  'models/BaseModel'
],
function( Backbone, BaseModel ) {
    'use strict';

  /* Return a model class definition */
  return BaseModel.extend({

    urlRoot: function() {return Paths.url + '/rol';}

    });
});
