define([
  'backbone',
  'config/paths'
],
function( Backbone, Paths ) {
    'use strict';

  /* Return a model class definition */
  var session = Backbone.Model.extend({

    urlRoot: function(){ return Paths.url + '/login';},

    defaults: {
      id: 'id_id',
      name: 'Alvaro',
      last_name: 'Chalar',
      company: {
        name: 'Wuaki.tv'
      },
      rol: {
        name: 'Manager'
      },
      email: 'alvaro.chalar@wuaki.tv'
    }

  });

  return new session();
});
