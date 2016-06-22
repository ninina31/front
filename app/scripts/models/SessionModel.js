define([
  'backbone',
  'classes/store',
  'config/paths'
],
function( Backbone, Store, Paths ) {
    'use strict';

  /* Return a model class definition */
  var session = Backbone.Model.extend({

    urlRoot: function(){
      if (this.isCandidate()) {
        return Paths.url + '/candidate/login';
      }
      else {
        return Paths.url + '/user/login';
      }
    },

    defaults: {
      logged: false
    },

    parse: function (response) {
      Store.set('apikey', response.message.key);
      response.message.user.logged = true;
      response.message.user.timestamp = Date.now;
      return Backbone.Collection.prototype.parse.call(this, response.message.user);
    },

    checkAuth: function () {
      var user = Store.get('user');
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
      var permit = page.getPermit();
      if (this.isCandidate()) {
        return [4, 24].indexOf(permit) > -1;
      }

      var permits = this.get('permits');
      return permits.findWhere({id_permit: permit}) != undefined;
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
    },

    isCandidate: function () {
      return this.get('loginType') == 'candidate';
    }

  });

  return new session();
});
