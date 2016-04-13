define([
  'backbone',
  'models/AnswerModel',
  'config/paths'
],
function( Backbone, AnswerModel, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a Questioncollection collection");
    },

    model: AnswerModel,

    url: function() {return Paths.url + '/candidate_question_answer';},

    save: function (options) {
      Backbone.sync('create', this, options);
    }
  });
});