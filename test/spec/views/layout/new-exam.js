(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/new-exam'
		],
		function( NewExam ) {

			describe('NewExam Layout', function () {

				it('should be an instance of NewExam Layout', function () {
					var new-exam = new NewExam();
					expect( new-exam ).to.be.an.instanceof( NewExam );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );