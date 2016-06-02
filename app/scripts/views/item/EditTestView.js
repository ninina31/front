define([
  'backbone',
  'underscore',
  'models/CandidateTestModel',
  'hbs!tmpl/item/TestFormView_tmpl'
],
function( Backbone, _, CandidateTestModel, TestFormViewTmpl) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      _.bindAll(this, 'checkForCandidates', 'errorCandidates', "onSaveSuccess", "onSaveFail", 'renderView');
      var candidate = new CandidateTestModel({id: this.model.id});
      debugger
      candidate.fetch({
        success: this.checkForCandidates,
        error: this.errorCandidates,
      });
    },
    
    template: TestFormViewTmpl,

    /* ui selector cache */
    ui: {
      form: 'form',
      'errorMsg': '.js-error'
    },

    /* Ui events hash */
    events: {
      'click #saveQuiz': 'updateTest'
    },

    checkForCandidates: function (model, response, options) {
      // debugger
      if (response.message.length == 0) {
        
      }
      this.model.fetch({
        success: this.renderView
      });
    },

    errorCandidates: function () {
      // body...
    },

    renderView: function(){
      this.trigger('fetched', this);
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

    toogleTrueFalseFields: function (enabled) {
      Backbone.$('[name*="type"] option:selected[value="5"]').closest('fieldset').find('[name*="options-"]').attr('disabled', enabled);
    },

    updateTest: function (e) {
      e.preventDefault();
      if(this.hasEmptyInputs()){
        return false;
      }
      this.toogleTrueFalseFields(false);
      var form = this.ui.form.serializeObject();
      this.toogleTrueFalseFields(true);
      var testData = this.getTestData(form);
      this.model.save(testData,
      {
        type: 'put',
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
      data.id_user = 2;
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
      this.trigger('testEdited', this.model);
    },
    onSaveFail: function (model, xhr, options) {
      this.ui.errorMsg.removeClass('hidden'); 
    },

    /* on render callback */
    onRender: function() {
    }
  });

});
