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
function( Backbone, _, QuestionView, TestformviewTmpl , AddQuestionView_tmpl, selectionTmpl, selectionSimpleTmpl, trueFalseTmpl, TestFormModel, QuestionModel, QuestionCollection, QuestionsFormModel) {
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
    	ui: {
        form: 'form',
        errorMsg: '.js-error',
        successMsg: '.alert.alert-success'
      },

		/* Ui events hash */
		events: {
      'click #saveQuiz': 'saveQuiz',
      'click #addQuestion': 'addQuestion',
      'change select': 'onChangeSelect',
      'change [name="is_autocorrect"]': 'onChangeAutocorrect'
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

    saveQuiz: function (e) {
      e.preventDefault();
      if(this.hasEmptyInputs()){
        return false;
      }
      this.toogleTrueFalseFields(false);
      var form = this.ui.form.serializeObject();
      this.toogleTrueFalseFields(true);
      var testData = this.getTestData(form);
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

    onSaveSuccess: function (model, response, options) {
      this.ui.errorMsg.addClass('hidden');
      this.ui.successMsg.removeClass('hidden');
      this.ui.form[0].reset();
    },
    onSaveFail: function (model, xhr, options) {
      this.ui.errorMsg.removeClass('hidden');
    },

		/* on render callback */
		onRender: function() {}
	});

});
