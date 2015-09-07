(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/ReviewTestView'
		],
		function( Reviewtestview ) {

			describe('Reviewtestview Itemview', function () {

				it('should be an instance of Reviewtestview Itemview', function () {
					var ReviewTestView = new Reviewtestview();
					expect( ReviewTestView ).to.be.an.instanceof( Reviewtestview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );