define([
  'backbone',
  'models/CorrectAnswerModel',
  'config/paths'
],
function( Backbone, CorrectAnswerModel, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a CorrectAnswercollection collection");
    },

    model: CorrectAnswerModel,

    url: function() {return Paths.url + '/correctanswers';},

    save: function (options) {
      Backbone.sync('create', this, options);
    }
  });
});
