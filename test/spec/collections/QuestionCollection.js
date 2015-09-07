(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/QuestionCollection'
		],
		function( Questioncollection ) {

			describe('Questioncollection Collection', function () {

				it('should be an instance of Questioncollection Collection', function () {
					var QuestionCollection = new Questioncollection();
					expect( QuestionCollection ).to.be.an.instanceof( Questioncollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );