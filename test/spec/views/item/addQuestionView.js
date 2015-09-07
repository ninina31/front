(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/addQuestionView'
		],
		function( Addquestionview ) {

			describe('Addquestionview Itemview', function () {

				it('should be an instance of Addquestionview Itemview', function () {
					var addQuestionView = new Addquestionview();
					expect( addQuestionView ).to.be.an.instanceof( Addquestionview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );