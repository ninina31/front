define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function(question_type) {
			console.log("initialize a Questionmodel model");
      this.set('question_type', question_type);
		},

		defaults: function () {
      return {
        'type': { 'id' : 1 }
      };
    }

    });
});
