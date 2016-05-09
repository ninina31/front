define([
  'backbone',
  'models/SessionModel',
  'hbs!tmpl/item/LoginView_tmpl'
],
function( Backbone, SessionModel, LoginviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a Loginview ItemView");
      _.bindAll(this, 'iniciarSesion', 'onSaveSuccess', 'onSaveError', 'getData');
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
      this.model.set(this.getData());
      this.model.set({ logged: true });
      // this.model.save(null, {
      //   success: this.onSaveSuccess,
      //   error: this.onSaveError
      // });
      Backbone.history.navigate('', {trigger: true});
    },

    onSaveSuccess: function () {
      Backbone.history.navigate('', {trigger: true});
    },

    onSaveError: function () {
      // body...
    },

    getData: function () {
      var email = this.$el.find('#email').val();
      var password = this.$el.find('#password').val();
      return { email: email, password: password };
    }
  });

});
