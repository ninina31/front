define([
  'backbone',
  'hbs!tmpl/item/DoTestView_tmpl',
  'hbs!tmpl/item/doTest_tmpl',
  'models/TestModel',
  'models/AnswersTestModel'
],
function( Backbone, DotestviewTmpl, DoTestTmpl, TestModel, AnswersTestModel) {
    'use strict';

  var interval;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    initialize: function() {
      console.log("initialize a Dotestview ItemView");
      _.bindAll(this, "finishTime", "disableTest", 'successFetchTest', 'handleTest', 'sendTest');
    },
    
      template: DotestviewTmpl,
        

      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {
      'click #beginTest': 'beginTest',
      'click #sendTest': 'handleTest'
    },

    beginTest: function (e) {
      e.preventDefault;
      this.model.fetch({
        success: this.successFetchTest
      });
    },

    successFetchTest: function (model) {
      var questions = model.get(1);
      console.log(model.get(1));
      console.log(model.get(2));
      var byQuestion = _.groupBy(_.flatten(model.get(2)), function (obj) {
        return obj.question.id;
      });
      var questions = _.map(model.get(1), function (obj) {
        obj.proposed_answer = byQuestion[obj.id];
        return obj;
      });
      this.$el.html(this.template({test: model.get(0), questions: questions}));
      Backbone.$('#exam').html(DoTestTmpl({test: model.get(0), questions: questions}));
      Backbone.$('.layout').fadeOut();
      var time = model.get(0).duration;
      console.log(time);
      this.countdown(time, this.finishTime);
    },

    finishTime: function () {
      Backbone.$('#clock').addClass('extraTime');
      var extraTime = this.model.get(0).extra_time;
      this.countdown(extraTime, this.disableTest);
    },

    disableTest: function () {
      Backbone.$('#clock').html('Tiempo terminado!');
      Backbone.$('#examSent > div').html('El tiempo se ha terminado y la prueba fue enviada automáticamente, gracias!');
      this.sendTest();
    },

    handleTest: function (e) {
      e.preventDefault();
      Backbone.$('#clock').addClass('hidden');
      this.sendTest();
    },

    sendTest: function () {
      var data = this.getFormData();
      var model = new AnswersTestModel(data);
      model.save({},
      {
        type: 'post',
        contentType: "application/json",
        success: this.onSaveSuccess, 
        error: this.onSaveFail
      }
      );
    },

    onSaveSuccess: function (model) {
      $('#exam').remove();
      clearInterval(interval);
      $('#examSent').removeClass('hidden');
    },

    onSaveFail: function (model) {
      $('.js-error').removeClass('hidden');
    },

    getFormData: function () {
      var data = Backbone.$('input[type="text"], [name*="result-"]:checked, textarea');
      var answers = _.map(data, function (obj, key) {
        obj = $(obj);
        var info = obj.attr('name').split('-');
        var question_id = parseInt(obj.closest('.form-group').data('question'));
        var response = {id_question: question_id, file: ''};
        if (info[1] == 5) {
          response.answer = JSON.parse(obj.val());
        } else {
          response.answer = obj.val();
        };
        return response;
      });
      var response = {};
      response.questions = answers;
      response.id_test = this.model.get(0).id_test;
      response.id_candidate = 1;
      console.log(response);
      Backbone.$('input, textarea').attr('disabled', true);
      return response;
    },

    countdown: function (time, callback) {
      $('#clock').html(time.toString() + ':00');
      interval = setInterval(function() {
        var timer = $('#clock').html();
        timer = timer.split(':');
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        seconds -= 1;
        if (minutes < 0) return clearInterval(interval);
        if (minutes < 10 && minutes.length != 2) minutes = '0' + minutes;
        if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
        }
        else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;
        $('#clock').html(minutes + ':' + seconds);
        
        if (minutes == 0 && seconds == 0){
          clearInterval(interval);
          callback.call();
        }
      }, 1000);
    }
  });

});
