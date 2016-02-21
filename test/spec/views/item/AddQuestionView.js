(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/AddQuestionView'
		],
		function( Addquestionview ) {

			describe('Addquestionview Itemview', function () {

				it('should be an instance of Addquestionview Itemview', function () {
					var AddQuestionView = new Addquestionview();
					expect( AddQuestionView ).to.be.an.instanceof( Addquestionview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );