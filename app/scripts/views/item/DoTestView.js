define([
  'backbone',
  'hbs!tmpl/item/DoTestView_tmpl',
  'hbs!tmpl/item/doTest_tmpl',
  'models/TestModel',
  'models/CandidateTestModel',
  'collections/AnswerCollection'
],
function( Backbone, DotestviewTmpl, DoTestTmpl, TestModel, CandidateTestModel, AnswerCollection) {
    'use strict';

  var permit = 1;

  var interval;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    getPermit: function () {
      return permit;
    },

    initialize: function() {
      this.clock = {
        minutes: 0,
        seconds: 0
      };
      _.bindAll(this, 'finishTime', 'disableTest', 'successFetchCandidateTest', 'failFetchCandidateTest', 'successSaveCandidateTest', 'failSaveCandidateTest', 'handleTest', 'sendTest', 'countdown', 'getFormData', 'successFetchTest' ,'failFetchTest', 'onSaveSuccess', 'onSaveFail');
      this.candidateTest = new CandidateTestModel({
        id_test: this.model.get('id_test'),
        id_candidate: 1
      });
      $('.bs-example-modal-sm').modal({});
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
      e.preventDefault();
      this.candidateTest.fetch({
        success: this.successFetchCandidateTest,
        error: this.failFetchCandidateTest,
      });
    },

    successFetchCandidateTest: function (response) {
      var length = response.get('list').length;
      if (length > 0) {
        $('.bs-example-modal-sm').modal('show');
        return false;
      }
      this.successSaveCandidateTest();
      // response.save(null, {
      //   success: this.successSaveCandidateTest,
      //   error: this.failSaveCandidateTest
      // });
    },

    failFetchCandidateTest: function () {
      $('.bs-example-modal-sm').modal('show');
    },

    successSaveCandidateTest: function () {
      this.model.fetch({
        success: this.successFetchTest,
        error: this.failFetchTest
      });
    },

    failSaveCandidateTest: function () {
      
    },

    successFetchTest: function () {
      Backbone.$('#exam').html(DoTestTmpl(this.model.toJSON()));
      Backbone.$('.layout').fadeOut();
      this.ui.clock = Backbone.$('#clock');
      var time = this.model.get('duration');
      this.clock.minutes = time;
      this.countdown(time, this.finishTime);
    },

    failFetchTest: function () {},

    finishTime: function () {
      this.ui.clock.addClass('extraTime');
      var extraTime = this.model.get('extra_time');
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
      var collection = new AnswerCollection(data);
      collection.save(
      {
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
      var data = this.$el.find('.form-group');
      var answers = _.map(data, function (form_group, key) {
        form_group = $(form_group);
        var answer = form_group.find('[name*=result-]');
        var id_question = parseInt(form_group.data('question'));
        var response = {
          candidate_id : 1,
          proposedAnswer_id: answer.data('proposed'),
          answer: answer.val(),
          file: '',
          id_question: id_question,
          score: 0
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
