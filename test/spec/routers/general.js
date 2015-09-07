(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/general'
		],
		function( General ) {

			describe('General Router', function () {

				it('should be an instance of General Router', function () {
					var general = new General();
					expect( general ).to.be.an.instanceof( General );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );