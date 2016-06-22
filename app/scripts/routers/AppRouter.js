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
      'login(/:rol)': 'login',
      'presentarExamen/:id': 'doTest',
      'verExamen/:id': 'getTest',
      'corregirExamen/:id_test': 'reviewTest',
      'agregarUsuario': 'addUser',
      'verCorrector/:id': 'getUser',
      'listarUsuarios': 'listUsers',
      'editarUsuario/:id': 'editUser',
      'editarExamen/:id': 'editTest',
      'verUsuario/:id': 'getUser',
      'verPerfil': 'userProfile',
      '*path': 'showNotFound'
    }
  });
});
