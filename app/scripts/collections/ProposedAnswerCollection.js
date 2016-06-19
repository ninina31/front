define([
  'backbone',
  'collections/BaseCollection',
  'models/ProposedAnswerModel',
  'config/paths'
],
function( Backbone, BaseCollection, ProposedAnswerModel, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({

    model: ProposedAnswerModel,

    url: function() {return Paths.url + '/proposedanswers';},

    parse: function (collection) {
      return collection.message;
    }
    
  });
});
