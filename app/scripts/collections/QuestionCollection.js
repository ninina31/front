define([
  'backbone',
  'models/QuestionModel',
  'config/paths'
],
function( Backbone, QuestionModel, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      this.listenTo(this, 'add', function (question) {
        question.set({ question_number: this.length });
      })
    },

    model: QuestionModel,

    url: function() {return Paths.url + '/questions';},

    save: function (options) {
      this.saveData();
      Backbone.sync('create', this, options);
    },

    saveData: function () {
      this.each(function (question) {
        question.trigger('getData');
        question.unset('q_types');
        question.unset('question_type');
        question.unset('type');
      })
    },

    saveProposedAnswers: function () {
      var proposed_answers = [];
      this.each(function (question) {
        question.trigger('getProposedAnswers');
        proposed_answers = proposed_answers.concat(question.get('proposed'));
      })
      this.proposed_answers = proposed_answers;
      this.trigger('proposedAdded');
    }
  });
});
