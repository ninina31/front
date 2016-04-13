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
  'collections/ProposedAnswerCollection'
],
function( Backbone, _, QuestionView , selectionTmpl, selectionSimpleTmpl, trueFalseTmpl, QuestionsViewTmpl, QuestionModel, QuestionCollection, ProposedAnswerCollection) {
    'use strict';

  /* Return a CompositeView class definition */
  return Backbone.Marionette.CompositeView.extend({
 
    className: 'container',

    initialize: function() {
      this.model.fetch();
      console.log("initialize a QuestionCreationView CollectionView");
      this.collection = new QuestionCollection();
      this.questions = new QuestionCollection();
      this.proposed_answers = new ProposedAnswerCollection();
      this.tree = [];
      _.bindAll(this, 'onSaveQuestionsSuccess', 'onSaveQuestionsFail', 'onSaveProposedAnswerSuccess', 'onSaveProposedAnwserFail', 'changeNumberForId', 'createDOMTree', 'getIsCorrect', 'getScore', 'addQuestion');
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
    itemViewContainer: ".questions",

    /* Ui events hash */
    events: {
      'click #addQuestion': 'addQuestion',
      'click #saveQuestions': 'saveQuestions'
    },

    addQuestion: function (e) {
      e.preventDefault();
      var is_autocorrect = this.model.get('test').is_autocorrect;
      var model = new QuestionModel({is_autocorrect: is_autocorrect, q_types: this.model.get('question_types').toJSON()});
      var question = new QuestionView({model: model});
      this.collection.add(model);
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
      this.createDOMTree();
      this.getQuestionsData();
      this.questions.save(
      {
        success: this.onSaveQuestionsSuccess,
        error: this.onSaveQuestionsFail
      }
      );
    },

    getQuestionsData: function () {
      var context = this;
      _.each(this.tree, function (question) {
        var q = _.clone(question);
        delete q.proposed_answers;
        delete q.question_type;
        delete q.type;
        context.questions.push(q);
      });
    },

    changeNumberForId: function (hash) {
      _.each(this.tree, function (question) {
        var id_hash = _.find(hash, function (hash_value) {
          return hash_value.client_id === question.question_number;
        });
        question.id_question = id_hash.saved_item_id;
      });
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
      this.changeNumberForId(hash.message);
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
      Backbone.history.navigate('', {trigger: true});
    },

    onSaveProposedAnwserFail: function (jqXHR, textStatus, errorThrown) {},

    createDOMTree: function () {
      var tree = [];
      var questions = Backbone.$('fieldset');
      var question = {};
      var test = this.model;
      var context = this;
      questions.each(function () {
        question.question_number = $(this).data('number');
        question.id_type = $(this).find('[name="type"]').val();
        question.score = $(this).find('[name="score"]').val();
        question.id_test = test.id;
        question.description = $(this).find('[name="description"]').val();
        question.proposed_answers = [];
        var proposed = {};
        $(this).find('[name="options"]').each(function () {
          proposed.answer = $(this).val();
          proposed.is_correct = context.getIsCorrect(this, test, question);
          proposed.score = context.getScore(this, question, proposed);
          question.proposed_answers.push(proposed);
          proposed = {};
        });
        tree.push(question);
        question = {};
      });
      this.tree = tree;
    },

    getIsCorrect: function (proposedHTML, test, question) {
      var is_correct_seleccion = $(proposedHTML).closest('.form-group').find('[name^="is_correct"]');
      if (true) {
        if (question.id_type != 3 || question.id_type != 4) {
          console.log('a');
          return is_correct_seleccion.is(':checked');
        } else if (question.id_type == 3) {
          console.log('b');
          return true;
        } else {
          console.log('c');
          return false;
        }
      } else {
        console.log('d');
        return false;
      }
    },

    getScore: function (proposedHTML, question, proposed) {
      var score = $(proposedHTML).closest('.form-group').find('[name="autocorrect-options-score"]');
      if (score != []){
        return score.val() || 0;
      } else {
        return question.score;
      }
    }

  });

});