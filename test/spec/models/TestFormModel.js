(function() {
	'use strict';

	var root = this;

	root.define([
		'models/TestFormModel'
		],
		function( Testformmodel ) {

			describe('Testformmodel Model', function () {

				it('should be an instance of Testformmodel Model', function () {
					var TestFormModel = new Testformmodel();
					expect( TestFormModel ).to.be.an.instanceof( Testformmodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );