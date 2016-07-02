define([
  'backbone',
  'hbs!tmpl/item/DoTestView_tmpl',
  'hbs!tmpl/item/doTest_tmpl',
  'models/TestModel',
  'models/CandidateTestModel',
  'collections/CandidateTestCollection',
  'models/SessionModel',
  'collections/AnswerCollection'
],
function( Backbone, DotestviewTmpl, DoTestTmpl, TestModel, CandidateTestModel, CandidateTestCollection, SessionModel, AnswerCollection) {
    'use strict';

  var permit = 24;

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
      _.bindAll(this, 'finishTime', 'disableTest', 'successSaveCandidateTest', 'failSaveCandidateTest', 'handleTest', 'sendTest', 'countdown', 'getFormData', 'successFetchTest' ,'failFetchTest', 'onSaveSuccess', 'onSaveFail', 'getScore', 'sendResults', 'successFetchCandidateTest');
      this.collection = new CandidateTestCollection();
      $('#alreadyDone').modal({});
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
      this.collection.fetch({
        success: this.successFetchCandidateTest
        // error: this.failFetchCandidateTest,
      });
    },

    successFetchCandidateTest: function () {
      var candidate_test = this._getWithTestAndCandidate();
      if (candidate_test == undefined) {
        $('#alreadyDone').modal('show');
        return false;
      }
      if (candidate_test.get('id_test').is_active == false) {
        $('#active').modal('show');
        return false;
      }
      this.candidateTest = new CandidateTestModel({ id: candidate_test.id });
      this.candidateTest.save({ started: true }, {
        type: 'PUT',
        success: this.successSaveCandidateTest,
        error: this.failSaveCandidateTest,
      });
    },

    _getWithTestAndCandidate: function () {
      var data = { id_test: this.model.get('id_test'), id_candidate: SessionModel.id };
      var collection = this.collection.filter(function (ct) {
        return ct.get('id_test').id_test == data.id_test && ct.get('id_candidate').id == data.id_candidate && ct.get('is_taken') == false;
      }, this);
      return _.first(collection);
    },

    successSaveCandidateTest: function () {
      this.model.fetch({
        success: this.successFetchTest,
        error: this.failFetchTest
      });
    },

    failSaveCandidateTest: function (model, jqhxr) {
      if (jqhxr.responseText.indexOf(this.model.id) > 0) {
        $('#alreadyDone').modal('show');
      } else {
        $('.js-error').removeClass('hidden');
      }
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
      this.candidateTest.save({ started: false },
      {
        type: 'PUT',
        success: this.sendResults,
        error: this.onSaveFail
      }
      );
    },

    sendResults: function () {
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
      var answers = [];
      var proposed = _.flatten(_.pluck(this.model.get('questions'), 'proposed_answer'));
      // Recoger los checkboxes y radios
      var selected = this.$el.find('[name*=result-]:checked');
      _.each(selected, function (option) {
        option = $(option);
        var proposed_id = option.data('proposed');
        var proposed_object = _.findWhere(proposed, { id: proposed_id });
        var id_question = proposed_object.question.id;
        var response = {
          id_candidate: SessionModel.id,
          id_proposed_answer: proposed_id,
          answer: option.val(),
          file: '',
          id_question: id_question,
          score: proposed_object.score
        };
        answers.push(response);
      });
      // Recoger los campos abiertos y limitados
      var selected = this.$el.find('[type=text][name*=result-], textarea');
      _.each(selected, function (option) {
        option = $(option);
        var proposed_id = option.data('proposed');
        var proposed_object = _.findWhere(proposed, { id: proposed_id });
        var id_question = proposed_object.question.id;
        var response = {
          id_candidate: SessionModel.id,
          id_proposed_answer: proposed_id,
          answer: option.val(),
          file: '',
          id_question: id_question,
          score: this.getScore(proposed, proposed_id, option.val())
        };
        answers.push(response);
      }, this);
      Backbone.$('input, textarea').attr('disabled', true);
      return answers;
    },

    getScore: function (proposed, proposed_id, answer) {
      var proposed_object = _.findWhere(proposed, { id: proposed_id });
      if (proposed_object.question.type.id == 4) {
        return 0;
      }
      if (proposed_object.answer != answer) {
        return 0;
      }
      return proposed_object.score;
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
