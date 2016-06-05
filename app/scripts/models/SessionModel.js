define([
  'backbone',
  'models/BaseModel',
  'config/paths'
],
function( Backbone, BaseModel, Paths ) {
    'use strict';

  /* Return a model class definition */
  var session = BaseModel.extend({

    urlRoot: function(){ return Paths.url + '/user/login';},

    defaults: {
      logged: false
    },

    parse: function (response) {
      response.logged = true;
      return Backbone.Collection.prototype.parse.call(this, response);
    },

    checkAuth: function () {
      // TODO: check for user in localstorage
      return this.get('logged');
    },

    hasPermission: function (page) {
      var permits = this.get('permits');
      return permits.findWhere({id_permit: page.getPermit()}) != undefined;
    },

  });

  return new session();
});
