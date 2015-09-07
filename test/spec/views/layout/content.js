(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/content'
		],
		function( Content ) {

			describe('Content Layout', function () {

				it('should be an instance of Content Layout', function () {
					var content = new Content();
					expect( content ).to.be.an.instanceof( Content );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );