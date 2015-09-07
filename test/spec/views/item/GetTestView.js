(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/GetTestView'
		],
		function( Gettestview ) {

			describe('Gettestview Itemview', function () {

				it('should be an instance of Gettestview Itemview', function () {
					var GetTestView = new Gettestview();
					expect( GetTestView ).to.be.an.instanceof( Gettestview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );