define([
  'backbone',
  'underscore',
  'views/item/QuestionView',
  'hbs!tmpl/questions/seleccion_tmpl',
  'hbs!tmpl/questions/seleccion_simple_tmpl',
  'hbs!tmpl/questions/verdadero_falso_tmpl',
  'hbs!tmpl/item/AddQuestionView_tmpl',
  'models/QuestionModel',
  'collections/QuestionCollection',
  'collections/ProposedAnswerCollection',
  'collections/CorrectAnswerCollection'
],
function( Backbone, _, QuestionView , selectionTmpl, selectionSimpleTmpl, trueFalseTmpl, QuestionsViewTmpl, QuestionModel, QuestionCollection, ProposedAnswerCollection, CorrectAnswerCollection) {
    'use strict';

  /* Return a CompositeView class definition */
  return Backbone.Marionette.CompositeView.extend({
 
    className: 'container',

    initialize: function() {
      console.log("initialize a QuestionCreationView CollectionView");
      this.collection = new QuestionCollection();
      var context = this;
      console.log(this.model.get('test').is_autocorrect);
      _.each(this.model.get('questions'), function (question) {
        question.is_autocorrect = context.model.get('test').is_autocorrect;
        question.q_types = context.model.get('question_types').toJSON();
        context.collection.add(question);
      })
      this.questions = new QuestionCollection();
      this.proposed_answers = new ProposedAnswerCollection();
      _.bindAll(this, 'onSaveQuestionsSuccess', 'onSaveQuestionsFail', 'onSaveProposedAnswerSuccess', 'onSaveProposedAnwserFail');
    },
    
      template: QuestionsViewTmpl,

      /* ui selector cache */
      ui: {
        form: 'form',
        errorMsg: '.js-error',
        successMsg: '.alert.alert-success',
        questions: '.questions'
      },

    itemView: QuestionView,

    /* where are we appending the items views */
    itemViewContainer: '.questions',

    /* Ui events hash */
    events: {
      'click #addQuestion': 'addQuestion',
      'click #saveQuestions': 'saveQuestions'
    },

    addQuestion: function (e) {
      e.preventDefault();
      var model = new QuestionModel({is_autocorrect: this.model.get('test').is_autocorrect, q_types: this.model.get('question_types').toJSON()});
      this.collection.add(model);
    },

    toogleTrueFalseFields: function (enabled) {
      Backbone.$('[name*="type"] option:selected[value="5"]').closest('fieldset').find('[name="autocorrect-options-score"]').attr('disabled', enabled);
    },

    hasEmptyInputs: function () {
      var empty = this.ui.form.find("textarea, input:not([type=checkbox])").filter(function(index, ui) {
        return ui.value === "" && ui.disabled == false;
      });
      var not_empty = this.ui.form.find("textarea, input:not([type=checkbox])").filter(function(index, ui) {
        return ui.value != "";
      });
      $('.js-empty').addClass('hidden');
      not_empty.closest('.form-group').removeClass('has-error');
      if(empty.length) {
        $('.js-empty').removeClass('hidden');
        empty.closest('.form-group').addClass('has-error');
        return true;
      }
      return false;
    },

    saveQuestions: function (e) {
      e.preventDefault();
      if(this.hasEmptyInputs()){
        return false;
      }
      this.toogleTrueFalseFields(false);
      this.toogleTrueFalseFields(true);
      this.getQuestionsData();
      this.questions.save(
      {
        type: 'put',
        success: this.onSaveQuestionsSuccess,
        error: this.onSaveQuestionsFail
      }
      );
    },

    getQuestionsData: function () {
      var questions = Backbone.$('fieldset');
      var model = this.model;
      var context = this;
      questions.each(function () {
        var question = {};
        question.id = $(this).data('id');
        question.id_type = 1;//$(this).find('[name="type"]').val();
        question.score = $(this).find('[name="score"]').val();
        question.id_test = model.id;
        question.description = $(this).find('[name="description"]').val();
        context.questions.add(question);
        var question = {};
      });
      console.log(this.questions.toJSON());
    },

    getProposedAnswers: function () {
      var context = this;
      _.each(this.tree, function (question) {
        _.each(question.proposed_answers, function (proposed) {
          proposed.id_question = question.id_question;
          proposed.file = '';
          context.proposed_answers.push(proposed);
        });
      })
    },

    onSaveQuestionsSuccess: function (hash, response, options) {
      this.getProposedAnswers();
      this.proposed_answers.save(
      {
        success: this.onSaveProposedAnswerSuccess, 
        error: this.onSaveProposedAnwserFail
      }
      );
    },
    onSaveQuestionsFail: function (jqXHR, textStatus, errorThrown) {},

    updateIdsOnTree: function (collection) {
      _.each(this.tree, function (question) {
        var proposed = _.filter(collection, function(answer){return answer.question.id == question.id_question});
        _.each(question.proposed_answers, function (answer, index) {
          answer.answer = proposed[index].id;
        });
      });
    },

    onSaveProposedAnswerSuccess: function (collection, response, options) {
      this.updateIdsOnTree(collection.message);
      Backbone.history.navigate("", {trigger: true});
    },

    onSaveProposedAnwserFail: function (jqXHR, textStatus, errorThrown) {
    }
  });

});
