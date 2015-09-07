(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/questionTypes'
		],
		function( Questiontypes ) {

			describe('Questiontypes Collection', function () {

				it('should be an instance of Questiontypes Collection', function () {
					var questionTypes = new Questiontypes();
					expect( questionTypes ).to.be.an.instanceof( Questiontypes );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );