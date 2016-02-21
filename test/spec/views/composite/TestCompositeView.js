(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/TestCompositeView'
		],
		function( Testcompositeview ) {

			describe('Testcompositeview Compositeview', function () {

				it('should be an instance of Testcompositeview Compositeview', function () {
					var TestCompositeView = new Testcompositeview();
					expect( TestCompositeView ).to.be.an.instanceof( Testcompositeview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );