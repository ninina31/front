define([
  'backbone',
  'collections/BaseCollection',
  'models/QuestionTypeModel',
  'config/paths'
],
function( Backbone, BaseCollection, QuestionTypeModel, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({
    
    model: QuestionTypeModel,

    url: function() {return Paths.url + '/questiontypes';}
    
  });
});
