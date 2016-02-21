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
      this.clock = {
        minutes: 0,
        seconds: 0
      };
      _.bindAll(this, "finishTime", "disableTest", 'successFetchTest', 'handleTest', 'sendTest', 'countdown');
    },
    
      template: DotestviewTmpl,
        

      /* ui selector cache */
      ui: {
        clock: '#clock'
      },

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

    successFetchTest: function () {
      var byQuestion = _.groupBy(_.flatten(this.model.get('proposedAnswer')), function (obj) {
        return obj.question.id;
      });
      var questions = _.map(this.model.get('questions'), function (obj) {
        obj.proposed_answer = byQuestion[obj.id];
        return obj;
      });
      Backbone.$('#exam').html(DoTestTmpl(this.model.toJSON()));
      Backbone.$('.layout').fadeOut();
      this.ui.clock = Backbone.$('#clock');
      var time = this.model.get('test').duration;
      this.clock.minutes = time;
      this.countdown(time, this.finishTime);
    },

    finishTime: function () {
      this.ui.clock.addClass('extraTime');
      var extraTime = this.model.get('test').extra_time;
      this.clock.minutes = extraTime;
      this.clock.seconds = 0;
      this.countdown(extraTime, this.disableTest);
    },

    disableTest: function () {
      this.ui.clock.html('Tiempo terminado!');
      Backbone.$('#examSent > div').html('El tiempo se ha terminado y la prueba fue enviada automáticamente, gracias!');
      this.sendTest();
    },

    handleTest: function (e) {
      e.preventDefault();
      this.ui.clock.addClass('hidden');
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
      if (time < 10) time = '0' + time.toString();
      this.ui.clock.html(time + ':00');
      var self = this;
      interval = setInterval(function() {
        var minutes = self.clock.minutes;
        var seconds = self.clock.seconds;
        var zerominutes = '';
        var zeroseconds = '';
        seconds -= 1;
        if (minutes < 0) return clearInterval(interval);
        if (minutes < 10) zerominutes = '0';
        if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
        } else if (seconds < 10) zeroseconds = '0';
        self.clock.minutes = minutes;
        self.clock.seconds = seconds;
        self.ui.clock.html(zerominutes + minutes + ':' + zeroseconds + seconds);
        if (minutes == 0 && seconds == 0){
          clearInterval(interval);
          callback.call();
        }
      }, 1000);
    }
  });

});
