define([
  'backbone',
  'config/oauth2',
  'models/SessionModel',
  'collections/RolPermitCollection',
  'hbs!tmpl/item/LoginView_tmpl',
  'config/paths'
],
function( Backbone, Config, SessionModel, RolPermitCollection, LoginviewTmpl , Paths ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function(options) {
      gapi.client.load('gmail', 'v1', function() { /* Loaded */ });
      _.bindAll(this, 'iniciarSesion', 'onSaveSuccess', 'onSaveError', 'getData', 'onFetchRolSuccess', 'onFetchRolError', 'handleAuthResult');
      this.model = SessionModel;
      this.model.set({loginType: options.rol});
    },
    
    template: LoginviewTmpl,

    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {
      'click #iniciarSesion': 'iniciarSesion',
      'click #authorize-button': 'checkAuth'
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

    // handleClientLoad : function () {
    //   gapi.client.setApiKey(Config.apikey);
    //   window.setTimeout(this.checkAuth,1);
    // },

    checkAuth: function () {
      gapi.auth.authorize({client_id: Config.client_id, scope: Config.scope, immediate: true}, this.handleAuthResult);
    },

    handleAuthResult: function (authResult) {
      var authorizeButton = document.getElementById('authorize-button');
      if (authResult && !authResult.error) {
        this.makeApiCall();
      } else {
        authorizeButton.onclick = this.handleAuthClick;
      }
    },

    handleAuthClick: function (event) {
      gapi.auth.authorize({client_id: Config.client_id, scope: Config.scope, immediate: false}, this.handleAuthResult);
      return false;
    },

    makeApiCall: function () {
      var self = this;
      gapi.client.load('plus', 'v1').then(function() {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
              });
        request.then(function(resp) {
          var email = _.first(resp.result.emails).value;
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
