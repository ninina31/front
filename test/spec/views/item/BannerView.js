(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/BannerView'
		],
		function( Bannerview ) {

			describe('Bannerview Itemview', function () {

				it('should be an instance of Bannerview Itemview', function () {
					var BannerView = new Bannerview();
					expect( BannerView ).to.be.an.instanceof( Bannerview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );