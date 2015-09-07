(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/home'
		],
		function( Home ) {

			describe('Home Layout', function () {

				it('should be an instance of Home Layout', function () {
					var home = new Home();
					expect( home ).to.be.an.instanceof( Home );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );