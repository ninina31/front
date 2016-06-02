define([
  'backbone',
  'hbs!tmpl/item/ReviewTestView_tmpl',
  'views/item/AnswerView',
  'collections/AnswerCollection'
],
function( Backbone, ReviewtestviewTmpl, AnswerView, AnswerCollection ) {
    'use strict';

  /* Return a CompositeView class definition */
  return Backbone.Marionette.CompositeView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a Reviewtestview CompositeView");
      this.collection = new AnswerCollection(this.model.get('anwsers'));
    },
    
      template: ReviewtestviewTmpl,

      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {
      'keyup input': 'calculateScore'
    },

    itemViewContainer: 'questions',

    itemView: AnswerView,

    calculateScore: function () {
      var sum = _.reduce(Backbone.$('input'), function (memo, obj) {
        obj = $(obj);
        return parseInt(obj.val()) + memo;
      }, 0);
      Backbone.$('#score').html(sum + ' ptos');
    },

    /* on render callback */
    onRender: function() {
       var byQuestion = _.groupBy(_.flatten(this.model.get('proposedAnswer')), function (obj) {
        return obj.question.id;
      });
      var questions = _.map(this.model.get('questions'), function (obj) {
        obj.proposed_answer = byQuestion[obj.id];
        obj.anwser = 'prueba';
        return obj;
      });
      // TODO: agregar la parte de la respuesta del candidato
    }
  });

});
