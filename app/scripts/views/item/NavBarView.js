define([
  'backbone',
  'models/SessionModel',
  'hbs!tmpl/item/NavBarView_tmpl'
],
function( Backbone, SessionModel, NavbarviewTmpl  ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    initialize: function() {
      this.model = SessionModel;
      this.model.checkAuth();
    },
    
    template: NavbarviewTmpl,

    events: {
      'click #closeSession': 'logoutUser'
    },

    logoutUser: function (event) {
      event.preventDefault();
      this.model.logout();
      Backbone.history.navigate('login', {trigger: true});
    }

  });

});
