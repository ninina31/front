(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/NavBarView'
		],
		function( Navbarview ) {

			describe('Navbarview Itemview', function () {

				it('should be an instance of Navbarview Itemview', function () {
					var NavBarView = new Navbarview();
					expect( NavBarView ).to.be.an.instanceof( Navbarview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );