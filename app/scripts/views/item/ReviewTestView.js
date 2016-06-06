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
      this.model.fetch({
        success: this.showContent
      });
    },

    showContent: function () {
      this.trigger('fetched', this);
      this.collection = new AnswerCollection(this.model.get('anwsers'));
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
