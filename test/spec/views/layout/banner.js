(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/banner'
		],
		function( Banner ) {

			describe('Banner Layout', function () {

				it('should be an instance of Banner Layout', function () {
					var banner = new Banner();
					expect( banner ).to.be.an.instanceof( Banner );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );