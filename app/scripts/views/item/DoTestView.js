define([
  'backbone',
  'hbs!tmpl/item/DoTestView_tmpl',
  'hbs!tmpl/item/doTest_tmpl',
  'models/TestModel',
  'collections/AnswerCollection'
],
function( Backbone, DotestviewTmpl, DoTestTmpl, TestModel, AnswerCollection) {
    'use strict';

  var interval;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    initialize: function() {
      console.log('initialize a Dotestview ItemView');
      this.clock = {
        minutes: 0,
        seconds: 0
      };
      _.bindAll(this, 'finishTime', 'disableTest', 'successFetchTest', 'handleTest', 'sendTest', 'countdown', 'getFormData');
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
        success: this.successFetchTest,
        fail: this.failFetchTest,
      });
    },

    successFetchTest: function () {
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
      if (extraTime > 0) {
        this.clock.minutes = extraTime;
        this.clock.seconds = 0;
        this.countdown(extraTime, this.disableTest);
      } else {
        this.disableTest();
      }
    },

    disableTest: function () {
      this.ui.clock.html('Tiempo terminado!');
      clearInterval(interval);
      Backbone.$('#examSent > div').html('El tiempo se ha terminado y la prueba fue enviada automáticamente, gracias!');
      this.sendTest();
    },

    handleTest: function (e) {
      e.preventDefault();
      clearInterval(interval);
      this.ui.clock.addClass('hidden');
      this.sendTest();
    },

    sendTest: function () {
      var data = this.getFormData();
      var model = new AnswerCollection(data);
      model.save({},
      {
        type: 'post',
        contentType: 'application/json',
        success: this.onSaveSuccess, 
        error: this.onSaveFail
      }
      );
    },

    onSaveSuccess: function (model) {
      $('#exam').remove();
      $('#examSent').removeClass('hidden');
    },

    onSaveFail: function (model) {
      $('.js-error').removeClass('hidden');
    },

    getFormData: function () {
      var data = Backbone.$('.form-group');
      var model = this.model;
      var answers = _.map(data, function (form_group, key) {
        form_group = $(form_group);
        var answer = form_group.find('[name*=result]');
        var info = answer.attr('name').split('-');
        var id_question = parseInt(form_group.data('question'));
        var response = {
          id_question: id_question,
          file: '',
          proposedAnswer_id: answer.val(),
          candidate_id : 1,
          id_test: model.get('test').id_test,
          answer: JSON.parse(answer.val())
        };
        return response;
      });
      Backbone.$('input, textarea').attr('disabled', true);
      return answers;
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
