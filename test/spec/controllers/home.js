(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/home'
		],
		function( Home ) {

			describe('Home Controller', function () {

				it('should be an instance of Home Controller', function () {
					var home = new Home();
					expect( home ).to.be.an.instanceof( Home );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );