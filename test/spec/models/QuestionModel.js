(function() {
	'use strict';

	var root = this;

	root.define([
		'models/QuestionModel'
		],
		function( Questionmodel ) {

			describe('Questionmodel Model', function () {

				it('should be an instance of Questionmodel Model', function () {
					var QuestionModel = new Questionmodel();
					expect( QuestionModel ).to.be.an.instanceof( Questionmodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );