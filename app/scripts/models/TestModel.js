define([
  'backbone',
  'models/BaseModel',
  'config/paths',
  'collections/QuestionTypeCollection'
],
function( Backbone, BaseModel, Paths, QuestionTypeCollection ) {
    'use strict';

  /* Return a model class definition */
  return BaseModel.extend({
    initialize: function() {
      console.log("initialize a Testmodel model");
    },

    idAttribute: "id_test",

    urlRoot: function() {return Paths.url + '/exams';},

    parse: function (model) {
      if (this.has('question_types')) this.get('question_types').fetch();
      var result = model;
      if (model.message != undefined) {
        return model.message;
      };
      return this.parseTest(result);
    },

    defaults: function () {
      return {
        'question_types': new QuestionTypeCollection()
      }
    },

    parseTest: function (model) {
      if (model.proposedAnswer == undefined) {
        return model;
      }
      var byQuestion = _.groupBy(_.flatten(model.proposedAnswer), function (obj) {
        return obj.question.id;
      });
      var questions = _.map(model.questions, function (obj) {
        obj.proposed_answer = byQuestion[obj.id];
        return obj;
      });
      var response = model.test;
      response.questions = questions;
      return response;
    }

    });
});
