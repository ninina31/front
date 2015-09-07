define([
	'backbone',
  'underscore',
  'views/item/QuestionView',
  'hbs!tmpl/item/TestFormView_tmpl',
  'hbs!tmpl/questions/seleccion_tmpl',
  'hbs!tmpl/questions/seleccion_simple_tmpl',
	'hbs!tmpl/questions/verdadero_falso_tmpl',
  'models/TestFormModel',
  'models/QuestionModel',
  'collections/QuestionCollection',
  'models/QuestionsFormModel'
],
function( Backbone, _, QuestionView, TestformviewTmpl , selectionTmpl, selectionSimpleTmpl, trueFalseTmpl, TestFormModel, QuestionModel, QuestionCollection, QuestionsFormModel) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

    className: 'container',

		initialize: function() {
			console.log("initialize a Testformview ItemView");
      this.collection = new QuestionCollection();
		},
		
    	template: TestformviewTmpl,

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
      'click #addQuestion': 'addQuestion',
      'click #saveQuiz': 'saveQuiz',
      'change select': 'onChangeSelect',
      'change [name="is_autocorrect"]': 'onChangeAutocorrect'
    },

    onChangeAutocorrect: function (e) {
      var autocorrect = Backbone.$('[name="is_autocorrect"]');
      if (autocorrect.is(':checked')) {
        Backbone.$('[name*="autocorrect-"]').attr('disabled', false);
      } else {
        Backbone.$('[name*="autocorrect-"]').attr('disabled', true);
      };
    },

    onChangeSelect: function (e) {
      var select = Backbone.$(e.target);
      var id = select.val();
      var parent = select.closest('fieldset');
      var number = parent.data('number');
      parent.find('.selection').remove();
      if (parseInt(id) == 1) {
        parent.append(selectionSimpleTmpl({number: number}));
      } else if (parseInt(id) == 2){
        parent.append(selectionTmpl({number: number}));
      } else if (parseInt(id) == 5){
        parent.append(trueFalseTmpl({number: number}));
      } else {
        parent.find('.selection').remove();
      };
      this.onChangeAutocorrect();
    },

    addQuestion: function (e) {
      e.preventDefault();
      var length = this.collection.length;
      var model = new QuestionModel({number: length});
      var question = new QuestionView({model: model});
      this.collection.push(model);
      this.appendQuestion(question);
    },

    appendQuestion: function (question) {
      var that = this;
      var collection = question.model.get('question_type');
      collection.fetch({
        success: function (collection) {
          question.$el.html(question.template({question_type: collection.toJSON(), number: question.model.get('number')}));
          Backbone.$('.questions').append(question.$el);
          that.onChangeAutocorrect();
        }
      });
    },

    toogleTrueFalseFields: function (enabled) {
      Backbone.$('[name*="type"] option:selected[value="5"]').closest('fieldset').find('[name*="options-"]').attr('disabled', enabled);
    },

    hasEmptyInputs: function () {
      var empty = $('form').find("textarea, input:not([type=checkbox])").filter(function() {
        return this.value === "";
      });
      var not_empty = $('form').find("textarea, input:not([type=checkbox])").filter(function() {
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

    saveQuiz: function (e) {
      e.preventDefault();
      if(this.hasEmptyInputs()){
        return false;
      }
      this.toogleTrueFalseFields(false);
      var form = $('form').serializeObject();
      this.toogleTrueFalseFields(true);
      var testData = this.getTestData(form);
      testData.questions = this.getQuestionsData(form);
      console.log(JSON.stringify(testData));
      var test = new TestFormModel(testData);
      test.save({},
      {
        type: 'post',
        contentType: "application/json",
        success: this.onSaveSuccess, 
        error: this.onSaveFail
      }
      );
    },

    getTestData: function (form) {
      var data = _.pick(form, 'instructions', 'name', 'duration', 'extra_time', 'is_autocorrect', 'is_active');
      data.is_autocorrect = this.getBooleanValues(data.is_autocorrect);
      data.is_active = this.getBooleanValues(data.is_active);
      data.duration = parseInt(data.duration);
      data.extra_time = parseInt(data.extra_time);
      data.id_manager = 1;
      return data;
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
      var questions = [];
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
        questions.push(question);
        question = {};
      };
      return questions;
    },

    onSaveSuccess: function (model, response, options) {
      $('.js-error').addClass('hidden');
      $('.alert.alert-success').removeClass('hidden');
      $('form')[0].reset();
    },
    onSaveFail: function (model, xhr, options) {
      $('.js-error').removeClass('hidden');
    },

		/* on render callback */
		onRender: function() {}
	});

});
