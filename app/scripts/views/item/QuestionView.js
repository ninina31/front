define([
	'backbone',
	'hbs!tmpl/item/QuestionView_tmpl',
  'hbs!tmpl/questions/seleccion_tmpl',
  'hbs!tmpl/questions/seleccion_simple_tmpl',
  'hbs!tmpl/questions/abierta_tmpl',
  'hbs!tmpl/questions/verdadero_falso_tmpl'
],
function( Backbone, QuestionviewTmpl, selectionTmpl, selectionSimpleTmpl, abiertaTmpl, trueFalseTmpl ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function(test) {
			console.log("initialize a Questionview ItemView");
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
      } else if (parseInt(id) == 5){
        parent.append(trueFalseTmpl({number: number}));
      } else {
        parent.find('.selection').remove();
      };
      this.setAutocorrectAnswers();
    },

    setAutocorrectAnswers: function () {
      var isNotDisabled = !this.model.get('is_autocorrect');
      Backbone.$('[name*="is_correct-"]').attr('disabled', isNotDisabled);
    },

    onAfterRender: function () {
      that.setAutocorrectAnswers();
    },

    checkScore: function () {
      var score = parseInt(this.el.find('input[name="score"]').val());
      var answersScore = this.el.find('[name*=score-]');
    }
	});

});
