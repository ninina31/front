define([
  'backbone',
  'underscore',
  'models/AnwserModel',
  'hbs!tmpl/item/AnswerView_tmpl'
],
function( Backbone, _, AnwserModel, AnswerviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a Answerview ItemView");
    },
    
      template: AnswerviewTmpl,

      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {}
    /* on render callback */
    onRender: function() {}
  });

});
