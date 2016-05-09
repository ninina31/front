define([
  'backbone',
  'underscore',
  'hbs!tmpl/item/GetUserView_tmpl'
],
function( Backbone, _, GetUserviewTmpl ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a GetUserview ItemView");
      _.bindAll(this, 'showUser', 'onDeleteSuccess', 'onDeleteFail');
      this.model.fetch({
        success: this.showUser
      });
    },
    
      template: GetUserviewTmpl,
        

      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {
      'click #deleteUser': 'deleteUser'
    },

    showUser: function (model) {
      this.trigger('fetched', this);
      $('[data-toggle="popover"]').popover({ html: true });
    },

    deleteUser: function () {
      this.model.destroy({
        method: 'DELETE',
        success: this.onDeleteSuccess,
        error: this.onDeleteFail
      });
    },

    onDeleteSuccess: function () {
      Backbone.history.navigate('listarCorrectores', {trigger: true});
    },

    onDeleteFail: function () {
      $('.alert.alert-danger').removeClass('hidden');
    }
    
  });

});
