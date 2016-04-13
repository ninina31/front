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
      'agregarExamen': 'addTest',
      'login': 'login',
      'agregarCuenta': 'addAccount',
      'presentarExamen/:id': 'doTest',
      'verExamen/:id': 'getTest',
      'corregirExamen/:id': 'reviewTest',
      'agregarCorrector': 'addReviewer',
      'verCuenta/:id': 'getAccount',
      'verCorrector/:id': 'getReviewer',
      'listarCuentas': 'listAccounts',
      'listarCorrectores': 'listReviewers',
      'editarCorrector/:id': 'editReviewer',
      'editarExamen/:id': 'editTest'
    }
	});
});
