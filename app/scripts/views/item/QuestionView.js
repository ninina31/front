define([
	'backbone',
	'hbs!tmpl/item/QuestionView_tmpl',
  'hbs!tmpl/questions/seleccion_tmpl',
  'hbs!tmpl/questions/seleccion_simple_tmpl',
  'hbs!tmpl/questions/verdadero_falso_tmpl'
],
function( Backbone, QuestionviewTmpl, selectionTmpl, selectionSimpleTmpl, trueFalseTmpl ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function(test) {
			console.log("initialize a Questionview ItemView");
		},
		
    	template: QuestionviewTmpl,
        

    	/* ui selector cache */
    	ui: { },

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
      } else if (parseInt(id) == 5){
        parent.append(trueFalseTmpl({number: number}));
      } else {
        parent.find('.selection').remove();
      };
      this.setAutocorrectAnswers();
    },

    setAutocorrectAnswers: function (e) {
      var isAutocorrect = this.model.get('is_autocorrect');
      if (isAutocorrect) {
        Backbone.$('[name*="autocorrect-"]').attr('disabled', false);
      } else {
        Backbone.$('[name*="autocorrect-"]').attr('disabled', true);
      };
    },

		/* on render callback */
		onBeforeRender: function() {
      var qtCollection = this.model.get('question_type');
      var that = this;
      qtCollection.fetch({
        success: function (collection) {
          that.$el.html(that.template({question_type: qtCollection.toJSON(), number: that.model.get('number')}));
          that.setAutocorrectAnswers();
        }
      });
    }
	});

});
