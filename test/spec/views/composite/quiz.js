(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/quiz'
		],
		function( Quiz ) {

			describe('Quiz Compositeview', function () {

				it('should be an instance of Quiz Compositeview', function () {
					var quiz = new Quiz();
					expect( quiz ).to.be.an.instanceof( Quiz );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );