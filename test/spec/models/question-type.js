(function() {
	'use strict';

	var root = this;

	root.define([
		'models/question-type'
		],
		function( QuestionType ) {

			describe('QuestionType Model', function () {

				it('should be an instance of QuestionType Model', function () {
					var question-type = new QuestionType();
					expect( question-type ).to.be.an.instanceof( QuestionType );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );