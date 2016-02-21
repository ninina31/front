define([
  'backbone',
  'underscore',
  'views/item/QuestionView',
  'hbs!tmpl/questions/seleccion_tmpl',
  'hbs!tmpl/questions/seleccion_simple_tmpl',
  'hbs!tmpl/questions/verdadero_falso_tmpl',
  'hbs!tmpl/item/AddQuestionView_tmpl',
  'models/QuestionModel',
  'collections/QuestionCollection'
],
function( Backbone, _, QuestionView , selectionTmpl, selectionSimpleTmpl, trueFalseTmpl, QuestionsViewTmpl, QuestionModel, QuestionCollection) {
    'use strict';

  /* Return a CompositeView class definition */
  return Backbone.Marionette.CompositeView.extend({
 
    className: 'container',

    initialize: function(model) {
      this.model = model;
      console.log("initialize a QuestionCreationView CollectionView");
      this.length = 0;
      this.collection = new QuestionCollection();
      _.bindAll(this, "onSaveQuestionsSuccess");
      _.bindAll(this, "onSaveQuestionsFail");
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
      this.length++;
      var model = new QuestionModel({number: this.length, is_autocorrect: this.model.get('is_autocorrect')});
      var question = new QuestionView({model: model});
      this.collection.add(model);
    },

    toogleTrueFalseFields: function (enabled) {
      Backbone.$('[name*="type"] option:selected[value="5"]').closest('fieldset').find('[name*="options-"]').attr('disabled', enabled);
    },

    hasEmptyInputs: function () {
      var empty = this.ui.form.find("textarea, input:not([type=checkbox])").filter(function() {
        return this.value === "";
      });
      var not_empty = this.ui.form.find("textarea, input:not([type=checkbox])").filter(function() {
        return this.value != "";
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
      // if(this.hasEmptyInputs()){
      //   return false;
      // }
      this.toogleTrueFalseFields(false);
      var form = this.ui.form.serializeObject();
      this.toogleTrueFalseFields(true);
      var questions = this.getQuestionsData(form);
      console.log(JSON.stringify(questions));
      console.log(this.collection);
      this.collection.save(
      {
        type: 'post',
        contentType: "application/json",
        success: this.onSaveQuestionsSuccess, 
        error: this.onSaveQuestionsFail
      }
      );
    },

    getBooleanValues: function (value) {
      if (value != undefined) {
        return true;
      } else {
        return false;
      };
    },

    getQuestionsData: function (form) {
      var question = {};
      // var questions = [];
      for (var i = 0; i < this.collection.length; i++) {
        question.description = form['description-'+i];
        question.id_type = Backbone.$('#type-'+i).val();
        question.score = form['score-'+i];
        var options = _.pick(form, 'options-1-'+i, 'options-2-'+i, 'options-3-'+i, 'options-4-'+i);
        options = _.map(options, function (val, key) {
          var correct = Backbone.$('[name=' + key + ']').closest('.form-group').find('[name="autocorrect-is_correct"]').is(':checked');
          return {file: "", answer: val, correct: correct};
        });
        question.proposed_answer = _.values(options);
        this.collection.at(i).set(question);
        console.log(this.collection.at(i));
        // questions.push(question);
        question = {};
      };
      // return questions;
    },

    onSaveQuestionsSuccess: function (model, response, options) {
      console.log('success!');
      // TODO: redirect to home
    },
    onSaveQuestionsFail: function (model, response, options) {},

    onRender: function () {
    }

  });

});
