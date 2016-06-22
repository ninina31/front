define([
  'backbone',
  'hbs!tmpl/item/ReviewTestView_tmpl',
  'views/item/AnswerView',
  'collections/AnswerCollection'
],
function( Backbone, ReviewtestviewTmpl, AnswerView, AnswerCollection ) {
    'use strict';

  var permit = 8;

  /* Return a CompositeView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      _.bindAll(this, 'showContent', 'inyectSolutions', 'onSaveSuccess', 'onSaveFail');
    },

    getPermit: function () {
      return permit;
    },

    template: ReviewtestviewTmpl,

    /* Ui events hash */
    events: {
      'keyup input': 'calculateScore',
      'click #reviewTest': 'reviewTest'
    },

    inyectSolutions: function () {
      this.collection.each(function (element, index) {
        var content = null;
        if ([3, 4].indexOf(element.get('id_proposed_answer').question.type.id) > -1) {
          content = element.get('answer');
        } else {
          content = '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
        }
        $('[data-idProposed='+element.get('id_proposed_answer').id+']').html(content);
        $($('[data-idScore='+element.get('id_proposed_answer').id+']')).val(element.get('score'));
      }, this);
    },

    onShow: function (argument) {
      this.inyectSolutions();
      this.calculateScore();
    },

    fetchContent: function () {
      Backbone.$.when(this.model.fetch(), this.collection.fetch({reset: true})).done(this.showContent);
    },

    showContent: function () {
      this.trigger('fetched', this);
    },

    calculateScore: function () {
      var sum = _.reduce(Backbone.$('input'), function (memo, obj) {
        obj = $(obj);
        if (obj.val() == '') {
          return memo;
        }
        return parseInt(obj.val()) + memo;
      }, 0);
      Backbone.$('#score').html(sum + ' ptos');
    },

    reviewTest: function () {
      this.collection.each(function (element, index) {
        var score = $('[data-idScore='+element.get('id_proposed_answer').id+']').val();
        element.set({ score: parseInt(score) });
      });
      this.collection.save({
        type: 'PUT',
        success: this.onSaveSuccess,
        error: this.onSaveFail
      });
    },

    onSaveSuccess: function () {
      $('.alert.alert-success').removeClass('hidden');
      $('.alert.alert-danger').addClass('hidden');
    },

    onSaveFail: function () {
      $('.alert.alert-success').addClass('hidden');
      $('.alert.alert-danger').removeClass('hidden');
    }

  });

});
