(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/QuestionTypeCollection'
		],
		function( Questiontypecollection ) {

			describe('Questiontypecollection Collection', function () {

				it('should be an instance of Questiontypecollection Collection', function () {
					var QuestionTypeCollection = new Questiontypecollection();
					expect( QuestionTypeCollection ).to.be.an.instanceof( Questiontypecollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );