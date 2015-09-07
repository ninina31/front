(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/TestCollection'
		],
		function( Testcollection ) {

			describe('Testcollection Collection', function () {

				it('should be an instance of Testcollection Collection', function () {
					var TestCollection = new Testcollection();
					expect( TestCollection ).to.be.an.instanceof( Testcollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );