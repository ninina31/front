define([
  'backbone',
  'models/ProposedAnswerModel',
  'config/paths'
],
function( Backbone, ProposedAnswerModel, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({

    model: ProposedAnswerModel,

    url: function() {return Paths.url + '/proposedanswers';},

    save: function (options) {
      Backbone.sync('create', this, options);
    },

    parse: function (collection) {
      return collection.message;
    }
    
  });
});
