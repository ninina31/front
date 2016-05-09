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
      // this.model.fetch();
      console.log("initialize a QuestionCreationView CollectionView");
      this.collection = new QuestionCollection();
      this.proposed_answers = new ProposedAnswerCollection();
      this.listenTo(this.collection, 'proposedAdded', this.saveProposedAnswers);
      _.bindAll(this, 'onSaveQuestionsSuccess', 'onSaveQuestionsFail', 'onSaveProposedAnswerSuccess', 'onSaveProposedAnwserFail', 'addQuestion');
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
      var is_autocorrect = this.model.get('is_autocorrect');
      var model = new QuestionModel({
        id_test: this.model.get('id_test'),
        is_autocorrect: is_autocorrect,
        q_types: this.model.get('question_types').toJSON()
      });
      this.collection.add(model);
    },

    hasEmptyInputs: function () {
      var empty = this.ui.form.find("textarea, input:not([type=checkbox])").filter('[required]').filter(function(index, ui) {
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
      this.collection.save(
      {
        success: this.onSaveQuestionsSuccess,
        error: this.onSaveQuestionsFail
      }
      );
    },

    onSaveQuestionsSuccess: function (hash, response, options) {
      this.collection.each(function (question) {
        var response_id = _.findWhere(hash.message, { client_id: question.get('question_number') });
        question.set('id', response_id.saved_item_id);
      });
      this.collection.saveProposedAnswers();
    },

    onSaveQuestionsFail: function (jqXHR, textStatus, errorThrown) {},

    saveProposedAnswers: function () {
      var proposed = this.collection.proposed_answers;
      this.proposed_answers.add(proposed);
      this.proposed_answers.save(
      {
        success: this.onSaveProposedAnswerSuccess, 
        error: this.onSaveProposedAnwserFail
      }
      );
    },

    onSaveProposedAnswerSuccess: function (collection, response, options) {
      Backbone.history.navigate('', {trigger: true});
    },

    onSaveProposedAnwserFail: function (jqXHR, textStatus, errorThrown) {},

  });

});
