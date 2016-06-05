define([
  'backbone',
  'models/QuestionTypeModel',
  'config/paths'
],
function( Backbone, QuestionTypeModel, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    
    model: QuestionTypeModel,

    url: function() {return Paths.url + '/questiontypes';}
    
  });
});
