(function() {
	'use strict';

	var root = this;

	root.define([
		'models/AccountModel'
		],
		function( Accountmodel ) {

			describe('Accountmodel Model', function () {

				it('should be an instance of Accountmodel Model', function () {
					var AccountModel = new Accountmodel();
					expect( AccountModel ).to.be.an.instanceof( Accountmodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );