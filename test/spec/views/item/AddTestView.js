(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/AddTestView'
		],
		function( Addtestview ) {

			describe('Addtestview Itemview', function () {

				it('should be an instance of Addtestview Itemview', function () {
					var AddTestView = new Addtestview();
					expect( AddTestView ).to.be.an.instanceof( Addtestview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );