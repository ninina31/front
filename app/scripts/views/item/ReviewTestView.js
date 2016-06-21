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

    onRender: function () {
      this.collection.each(function (element, index) {
        $('[data-id='+element.get('id_proposed_answer').id+']').html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
      })
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
        return parseInt(obj.val()) + memo;
      }, 0);
      Backbone.$('#score').html(sum + ' ptos');
    }

  });

});
