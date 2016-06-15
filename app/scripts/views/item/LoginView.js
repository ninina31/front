define([
  'backbone',
  'models/SessionModel',
  'collections/RolPermitCollection',
  'hbs!tmpl/item/LoginView_tmpl'
],
function( Backbone, SessionModel, RolPermitCollection, LoginviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      _.bindAll(this, 'iniciarSesion', 'onSaveSuccess', 'onSaveError', 'getData', 'onFetchRolSuccess', 'onFetchRolError');
      this.model = SessionModel;
    },
    
    template: LoginviewTmpl,

    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {
      'click #iniciarSesion': 'iniciarSesion'
    },

    iniciarSesion: function (event) {
      event.preventDefault();
      this.model.save(this.getData(), {
        success: this.onSaveSuccess,
        error: this.onSaveError
      });
    },

    onSaveSuccess: function () {
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

    onSaveError: function () {
      // body...
    },

    getData: function () {
      var email = this.$el.find('#email').val();
      var password = this.$el.find('#password').val();
      return { email: email, password: password };
    },

    savePermitsOnUser: function (data) {
      debugger
      var rol_id = this.model.get('rol_id').id;
      var permits = data.filter(function (element) {
        return element.get('id_rol') == rol_id;
      });
      permits = new Backbone.Collection(permits);
      var timestamp = Date.now();
      this.model.set({permits: permits, timestamp: timestamp});
      this.model.saveUser();
    }
  });

});
