define([
  'backbone',
  'underscore',
  'models/AnswerModel',
  'hbs!tmpl/item/AnswerView_tmpl'
],
function( Backbone, _, AnswerModel, AnswerviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    model: AnswerModel,

    template: AnswerviewTmpl

  });

});
