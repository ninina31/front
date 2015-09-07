(function() {
	'use strict';

	var root = this;

	root.define([
		'models/TestModel'
		],
		function( Testmodel ) {

			describe('Testmodel Model', function () {

				it('should be an instance of Testmodel Model', function () {
					var TestModel = new Testmodel();
					expect( TestModel ).to.be.an.instanceof( Testmodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );