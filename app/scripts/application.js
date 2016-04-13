define([
	'backbone',
	'communicator',
	'routers/AppRouter',
	'models/UserModel'
],

function( Backbone, Communicator, AppRouter, UserModel ) {
    'use strict';

  $.fn.serializeObject = function()
	{
	   var o = {};
	   var a = this.serializeArray();
	   $.each(a, function() {
	       if (o[this.name]) {
	           if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else {
	           o[this.name] = this.value || '';
	       }
	   });
	   return o;
	};

	Backbone.emulateHTTP = true;

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({'topNavbar': '#topNavbar'});
	App.addRegions({'content': '#content'});

	/* Add initializers here */
	App.addInitializer( function () {

		var router = new AppRouter();
		Communicator.mediator.trigger("APP:START");
		Backbone.history.start();

	});

	window.App = App;

	return App;
});
