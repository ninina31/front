define([
  'backbone',
  'hbs!tmpl/item/QuestionView_tmpl',
  'hbs!tmpl/questions/seleccion_tmpl',
  'hbs!tmpl/questions/seleccion_simple_tmpl',
  'hbs!tmpl/questions/abierta_tmpl',
  'hbs!tmpl/questions/abierta_nolimite_tmpl',
  'hbs!tmpl/questions/verdadero_falso_tmpl'
],
function( Backbone, QuestionviewTmpl, selectionTmpl, selectionSimpleTmpl, abiertaTmpl, abiertanolimiteTmpl, trueFalseTmpl ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    tagName: 'fieldset',

    initialize: function(options) {
      this.is_autocorrect = this.model.get('is_autocorrect');
      this.model.unset('is_autocorrect');
      this.listenTo(this.model, 'getData', this.retrieveInfo);
      this.listenTo(this.model, 'getProposedAnswers', this.retrieveProposedAnswers);
      _.bindAll(this, 'onChangeSelect', 'setAutocorrectAnswers');
    },

    attributes: function () {
      return {
        'data-question_number': this.model.get('question_number'),
        'data-id': this.model.get('id')
      }
    },
    
    template: QuestionviewTmpl,

    /* Ui events hash */
    events: {
      'change select': 'onChangeSelect'
    },

    onChangeSelect: function (e) {
      var select = Backbone.$(e.target);
      var id = select.val();
      var parent = select.closest('fieldset');
      var number = parent.data('number');
      parent.find('.selection').remove();
      if (parseInt(id) == 1) {
        parent.append(selectionSimpleTmpl({number: number}));
      } else if (parseInt(id) == 2){
        parent.append(selectionTmpl({number: number}));
      } else if (parseInt(id) == 3){
        parent.append(abiertaTmpl({number: number}));
      } else if (parseInt(id) == 4){
        parent.append(abiertanolimiteTmpl({number: number}));
      } else if (parseInt(id) == 5){
        parent.append(trueFalseTmpl({number: number}));
      } else {
        parent.find('.selection').remove();
      };
      this.setAutocorrectAnswers();
    },

    onRender: function () {
      this.setAutocorrectAnswers();
    },

    setAutocorrectAnswers: function () {
      var isDisabled = !this.is_autocorrect;
      Backbone.$('[name*="is_correct-"]').attr('disabled', isDisabled);
    },

    getScore: function (answerDom) {
      var parent = answerDom.closest('.form-group');
      var id_type = parseInt(this.$el.find('option:selected').val());
      if (id_type == 4) {
        return this.$el.find('[name="score"]').val();
      } else {
        return $(parent).find('[name*=score-]').val() || 0;
      }
    },

    getIsCorrect: function (answerDom) {
      var parent = answerDom.closest('.form-group');
      return $(parent).find('[name*=is_correct-]').is(':checked');
    },

    retrieveInfo: function () {
      var id_type = this.$el.find('option:selected').val();
      var description = this.$el.find('[name="description"]').val();
      var score = this.$el.find('[name="score"]').val();
      var data = {
        id_type: id_type,
        description: description,
        score: score
      };
      this.model.set(data);
    },

    retrieveProposedAnswers: function () {
      var proposed = [];
      _.each(this.$el.find('[name="options"]'), function (answerDom) {
        debugger
        var score = this.getScore(answerDom);
        var is_correct = this.getIsCorrect(answerDom);
        var answer = {
          id_question: this.model.get('id'),
          answer: $(answerDom).val(),
          file: 'none',
          is_correct: is_correct,
          score: score
        };
        var id = $(answerDom).data('id');
        if(!!id){
          answer.id = id;
        }
        proposed.push(answer);
      }, this)
      this.model.set({ proposed: proposed });
    },
  });

});
