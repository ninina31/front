(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/appLayoutView'
		],
		function( Applayoutview ) {

			describe('Applayoutview Layout', function () {

				it('should be an instance of Applayoutview Layout', function () {
					var appLayoutView = new Applayoutview();
					expect( appLayoutView ).to.be.an.instanceof( Applayoutview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );