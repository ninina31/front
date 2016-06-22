define([
  'backbone',
  'collections/BaseCollection',
  'models/AnswerModel',
  'config/paths'
],
function( Backbone, BaseCollection, AnswerModel, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({

    model: AnswerModel,

    url: function() {return Paths.url + '/candidate_question_answer';},

    initialize: function (options) {
      this.id_test = options.id_test;
      this.id_candidate = options.id_candidate;
      BaseCollection.prototype.initialize.call(this, options);
    },

    parse: function (response) {
      var result = _.filter(response, function (answer) {
         return answer.id_proposed_answer.question.id_test == this.id_test && answer.id_candidate.id == this.id_candidate;
      }, this);
      return result;
    }

  });
});
