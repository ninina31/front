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
      'agregarCompania': 'addCompany',
      'presentarExamen/:id': 'doTest',
      'verExamen/:id': 'getTest',
      'corregirExamen/:id': 'reviewTest',
      'agregarUsuario': 'addUser',
      'verCompania/:id': 'getCompany',
      'verCorrector/:id': 'getUser',
      'listarCompanias': 'listCompanies',
      'listarCorrectores': 'listUsers',
      'editarCorrector/:id': 'editUser',
      'editarExamen/:id': 'editTest'
    }
	});
});
