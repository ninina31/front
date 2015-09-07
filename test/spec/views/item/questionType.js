(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/questionType'
		],
		function( Questiontype ) {

			describe('Questiontype Itemview', function () {

				it('should be an instance of Questiontype Itemview', function () {
					var questionType = new Questiontype();
					expect( questionType ).to.be.an.instanceof( Questiontype );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );