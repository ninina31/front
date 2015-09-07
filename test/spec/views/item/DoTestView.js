(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/DoTestView'
		],
		function( Dotestview ) {

			describe('Dotestview Itemview', function () {

				it('should be an instance of Dotestview Itemview', function () {
					var DoTestView = new Dotestview();
					expect( DoTestView ).to.be.an.instanceof( Dotestview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );