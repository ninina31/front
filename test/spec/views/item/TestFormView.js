(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/TestFormView'
		],
		function( Testformview ) {

			describe('Testformview Itemview', function () {

				it('should be an instance of Testformview Itemview', function () {
					var TestFormView = new Testformview();
					expect( TestFormView ).to.be.an.instanceof( Testformview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );