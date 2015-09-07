(function() {
	'use strict';

	var root = this;

	root.define([
		'models/AnswersTestModel'
		],
		function( Answerstestmodel ) {

			describe('Answerstestmodel Model', function () {

				it('should be an instance of Answerstestmodel Model', function () {
					var AnswersTestModel = new Answerstestmodel();
					expect( AnswersTestModel ).to.be.an.instanceof( Answerstestmodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );