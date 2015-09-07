define([
	'backbone',
  '../views/layout/HomeLayout'
],
function( Backbone , HomeLayout ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Home Controller");
		},

    home: function ( options ) {
      var layout = new HomeLayout();
      layout.render();
    }
	});

});
