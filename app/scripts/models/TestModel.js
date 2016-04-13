define([
	'backbone',
  'config/paths',
  'collections/QuestionTypeCollection'
],
function( Backbone, Paths, QuestionTypeCollection ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Testmodel model");
		},

    idAttribute: "id_test",

    urlRoot: function() {return Paths.url + '/exams';},

    fetch: function (options) {
      this.get('question_types').fetch();
      return Backbone.Model.prototype.fetch.call(this, options);
    },

    parse: function (model) {
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
      var response = {
        test: model.test,
        questions: questions
      };
      return response;
    }

    });
});
