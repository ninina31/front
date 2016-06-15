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
  return Backbone.Marionette.CompositeView.extend({

    className: 'container',

    initialize: function() {
      _.bindAll(this, "showContent");
    },

    getPermit: function () {
      return permit;
    },

    template: ReviewtestviewTmpl,

    /* Ui events hash */
    events: {
      'keyup input': 'calculateScore'
    },

    itemViewContainer: 'questions',

    itemView: AnswerView,

    fetchContent: function () {
      Backbone.$.when(this.model.fetch(), this.collection.fetch()).done(this.showContent);
    },

    inyectGivenAnswer: function () {
      
    },

    showContent: function () {
      debugger;
      this.trigger('fetched', this);
    },

    calculateScore: function () {
      var sum = _.reduce(Backbone.$('input'), function (memo, obj) {
        obj = $(obj);
        return parseInt(obj.val()) + memo;
      }, 0);
      Backbone.$('#score').html(sum + ' ptos');
    }

  });

});
