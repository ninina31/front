(function() {
	'use strict';

	var root = this;

	root.define([
		'models/QuestionsFormModel'
		],
		function( Questionsformmodel ) {

			describe('Questionsformmodel Model', function () {

				it('should be an instance of Questionsformmodel Model', function () {
					var QuestionsFormModel = new Questionsformmodel();
					expect( QuestionsFormModel ).to.be.an.instanceof( Questionsformmodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );