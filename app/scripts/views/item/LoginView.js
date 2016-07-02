define([
  'backbone',
  'models/SessionModel',
  'collections/RolPermitCollection',
  'hbs!tmpl/item/LoginView_tmpl',
  'config/paths',
  'config/oauth2'
],
function( Backbone, SessionModel, RolPermitCollection, LoginviewTmpl , Paths, Config ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function(options) {
      _.bindAll(this, 'iniciarSesion', 'onSaveSuccess', 'onSaveError', 'getData', 'onFetchRolSuccess', 'onFetchRolError', 'initAuth', 'makeApiCall', 'updateSigninStatus');
      this.model = SessionModel;
      this.model.set({loginType: options.rol});
    },
    
    template: LoginviewTmpl,

    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {
      'click #iniciarSesion': 'iniciarSesion',
      'click #authorize-button': 'handleClientLoad'
    },

    iniciarSesion: function (event) {
      event.preventDefault();
      var url = this.model.urlRoot();
      if (this.rol == 'candidate') {
        url = Paths.url + '/candidate/login';
      }
      var data = this.getData();
      data.type = 'account';
      this.model.save(data, {
        url: url,
        success: this.onSaveSuccess,
        error: this.onSaveError
      });
    },

    onSaveSuccess: function () {
      $('.alert-danger').addClass('hidden');
      var rol_permit = new RolPermitCollection();
      rol_permit.fetch({
        success: this.onFetchRolSuccess,
        error: this.onSaveFetchRolError
      });
    },

    onFetchRolSuccess: function (data) {
      this.savePermitsOnUser(data);
      Backbone.history.navigate('', {trigger: true});
    },

    onFetchRolError: function () {
    },

    onSaveError: function (jqhxr, response) {
      $('.alert-danger').html(JSON.parse(response.responseText).message);
      $('.alert-danger').removeClass('hidden');
    },

    getData: function () {
      var username = this.$el.find('#email').val();
      var password = this.$el.find('#password').val();
      return { username: username, password: password };
    },

    savePermitsOnUser: function (data) {
      var permits = [];
      if (!this.model.isCandidate()) {
        var rol_id = this.model.get('rol_id').id;
        permits = data.filter(function (element) {
          return element.get('id_rol') == rol_id;
        });
      }
      permits = new Backbone.Collection(permits);
      var timestamp = Date.now();
      this.model.set({permits: permits, timestamp: timestamp});
      this.model.saveUser();
    },

    handleClientLoad: function () {
        // Load the API client and auth library
        gapi.load('client:auth2', this.initAuth);
    },

    initAuth: function () {
      var self = this;
      gapi.client.setApiKey(Config.apikey);
      gapi.auth2.init({
          client_id: Config.client_id,
          scope: Config.scope
      }).then(function () {
        var auth2 = gapi.auth2.getAuthInstance();
        debugger
        self.updateSigninStatus(auth2.isSignedIn.get());
      });
    },
  
    updateSigninStatus: function(isSignedIn) {
      var self = this;
      var auth2 = gapi.auth2.getAuthInstance();
      if (isSignedIn) {
        auth2.signOut().then(function () {
          auth2.signIn().then(function () {
            self.makeApiCall();
          });
        });
      } else {
        auth2.signIn().then(function () {
          self.makeApiCall();
        });
      }
    },

    makeApiCall: function () {
      var self = this;
      gapi.client.load('people', 'v1').then(function() {
        var request = gapi.client.people.people.get({
            'resourceName': 'people/me'
              });
        request.then(function(resp) {
          var email = _.first(resp.result.emailAddresses).value;
          var type = 'gmail';
          var url = self.model.urlRoot();
          if (self.rol == 'candidate') {
            url = Paths.url + '/candidate/login';
          }
          self.model.save({username: email, type: type}, {
            url: url,
            success: self.onSaveSuccess,
            error: self.onSaveError
          });
          // mandar a servidor de login esto
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        }, this);
      }, this);
    }
  });

});
