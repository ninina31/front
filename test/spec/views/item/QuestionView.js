(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/QuestionView'
		],
		function( Questionview ) {

			describe('Questionview Itemview', function () {

				it('should be an instance of Questionview Itemview', function () {
					var QuestionView = new Questionview();
					expect( QuestionView ).to.be.an.instanceof( Questionview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );