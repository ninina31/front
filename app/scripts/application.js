define([
  'backbone',
  'communicator',
  'routers/AppRouter',
  'models/SessionModel'
],

function( Backbone, Communicator, AppRouter, SessionModel ) {
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

  var App = new Backbone.Marionette.Application();

  /* Add application regions here */
  App.addRegions({'topNavbar': '#topNavbar'});
  App.addRegions({'content': '#content'});

  /* Add initializers here */
  App.addInitializer( function () {

    var model = SessionModel;

    var logged = model.checkAuth();

    var router = new AppRouter();
    Communicator.mediator.trigger("APP:START");
    Backbone.history.start();

    if (!logged) {
      Backbone.history.navigate('#login', {trigger: true});
    }


  });

  window.App = App;

  return App;
});
