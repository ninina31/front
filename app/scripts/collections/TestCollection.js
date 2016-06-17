define([
  'backbone',
  'collections/BaseCollection',
  'models/TestModel',
  'config/paths'
],
function( Backbone, BaseCollection, TestModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({

    model: TestModel,

    url: function() {return Paths.url + '/exams';}
    
  });
});
