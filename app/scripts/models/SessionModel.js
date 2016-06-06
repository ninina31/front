define([
  'backbone',
  'classes/store',
  'models/BaseModel',
  'config/paths'
],
function( Backbone, Store, BaseModel, Paths ) {
    'use strict';

  /* Return a model class definition */
  var session = BaseModel.extend({

    urlRoot: function(){ return Paths.url + '/user/login';},

    defaults: {
      logged: false
    },

    parse: function (response) {
      response.logged = true;
      response.timestamp = Date.now;
      return Backbone.Collection.prototype.parse.call(this, response);
    },

    checkAuth: function () {
      var user = Store.get('user');
      user = JSON.parse(user);
      if (user != undefined) {
        user.permits = new Backbone.Collection(user.permits);
        this.set(user);
        return this.isValid();
      }
      return this.get('logged');
    },

    canAccessPage: function (page) {
      if (!this.get('logged')) {
        return false;
      }
      var permits = this.get('permits');
      return permits.findWhere({id_permit: page.getPermit()}) != undefined;
    },

    saveUser: function () {
      Store.set('user', this.toJSON());
    },

    logout: function () {
      Store.delete('user');
      this.clear();
      this.set({logged: false});
    },

    isValid: function () {
      var now = Date.now();
      var before = this.get('timestamp');
      // One day
      if ((now - before) <= 86400000) {
        return true;
      } else {
        this.logout();
        return false;
      }
    }

  });

  return new session();
});
