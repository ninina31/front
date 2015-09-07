(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/HomeView'
		],
		function( Homeview ) {

			describe('Homeview Itemview', function () {

				it('should be an instance of Homeview Itemview', function () {
					var HomeView = new Homeview();
					expect( HomeView ).to.be.an.instanceof( Homeview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );