define([
  'backbone',
  'classes/googleAPI',
  'models/SessionModel',
  'collections/RolPermitCollection',
  'hbs!tmpl/item/LoginView_tmpl',
  'config/paths'
],
function( Backbone, GoogleAPI, SessionModel, RolPermitCollection, LoginviewTmpl , Paths ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function(options) {
      _.bindAll(this, 'iniciarSesion', 'onSaveSuccess', 'onSaveError', 'getData', 'onFetchRolSuccess', 'onFetchRolError', 'loginOauth2');
      this.model = SessionModel;
      this.model.set({loginType: options.rol});
    },
    
    template: LoginviewTmpl,

    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {
      'click #iniciarSesion': 'iniciarSesion',
      'click #authorize-button': 'loginOauth2'
    },

    iniciarSesion: function (event) {
      event.preventDefault();
      var url = this.model.urlRoot();
      if (this.rol == 'candidate') {
        url = Paths.url + '/candidate/login';
      }
      this.model.save(this.getData(), {
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

    loginOauth2: function () {
      GoogleAPI.checkAuth();
    },

    savePermitsOnUser: function (data) {
      var permits = [];
      if (this.model.isCandidate()) {
        // var permits = 
      } else {
        var rol_id = this.model.get('rol_id').id;
        permits = data.filter(function (element) {
          return element.get('id_rol') == rol_id;
        });
      }
      permits = new Backbone.Collection(permits);
      var timestamp = Date.now();
      this.model.set({permits: permits, timestamp: timestamp});
      this.model.saveUser();
    }
  });

});
