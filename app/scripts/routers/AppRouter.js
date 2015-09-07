define([
	'backbone',
  'controllers/appController'
],
function(Backbone, appController){
    'use strict';

  var appController = new appController();

	return Backbone.Marionette.AppRouter.extend({
		controller: appController,
    /* Backbone routes hash */
		appRoutes: {
      '': 'home',
      'agregarPrueba': 'addTest',
      'login': 'login',
      'agregarCuenta': 'addAccount',
      'presentarPrueba/:id': 'doTest',
      'verPrueba/:id': 'getTest',
      'corregirPrueba/:id': 'reviewTest'
    }
	});
});
