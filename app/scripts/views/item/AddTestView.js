define([
  'backbone',
  'underscore',
  'hbs!tmpl/item/AddTestView_tmpl',
  'models/TestModel'
],
function( Backbone, _, AddTestViewTmpl, TestModel) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a AddTestView ItemView");
      _.bindAll(this, "onSaveSuccess", "onSaveFail");
    },
    
      template: AddTestViewTmpl,

      /* ui selector cache */
      ui: {
        form: 'form'
      },

    /* Ui events hash */
    events: {
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

    saveQuiz: function (e) {
      e.preventDefault();
      if(this.hasEmptyInputs()){
        return false;
      }
      this.toogleTrueFalseFields(false);
      var form = this.ui.form.serializeObject();
      this.toogleTrueFalseFields(true);
      var testData = this.getTestData(form);
      var test = new TestModel(testData);
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
      console.log('onSaveSuccess, model');
      console.log(model);
      this.trigger('testAdded', model);
    },
    onSaveFail: function (model, xhr, options) {
      this.ui.errorMsg.removeClass('hidden'); 
    },

    /* on render callback */
    onRender: function() {
    }
  });

});
