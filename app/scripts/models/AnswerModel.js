define([
  'backbone',
  'models/BaseModel'  
],
function( Backbone, BaseModel ) {
    'use strict';

  /* Return a model class definition */
  return BaseModel.extend({
    initialize: function() {
      console.log("initialize a Answermodel model");
    }

    });
});
