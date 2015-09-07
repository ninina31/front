(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/addQeustionView'
		],
		function( Addqeustionview ) {

			describe('Addqeustionview Itemview', function () {

				it('should be an instance of Addqeustionview Itemview', function () {
					var addQeustionView = new Addqeustionview();
					expect( addQeustionView ).to.be.an.instanceof( Addqeustionview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );