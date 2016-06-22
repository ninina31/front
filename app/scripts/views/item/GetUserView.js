define([
  'backbone',
  'underscore',
  'hbs!tmpl/item/GetUserView_tmpl'
],
function( Backbone, _, GetUserviewTmpl ) {
    'use strict';

  var permit = 12;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      _.bindAll(this, 'showUser', 'onDeleteSuccess', 'onDeleteFail');
    },

    getPermit: function () {
      return permit;
    },
    
    template: GetUserviewTmpl,

    /* Ui events hash */
    events: {
      'click #deleteUser': 'deleteUser'
    },

    fetchContent: function () {
      this.model.fetch({
        success: this.showUser
      });
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
      Backbone.history.navigate('listarUsuarios', {trigger: true});
    },

    onDeleteFail: function () {
      $('.alert.alert-danger').removeClass('hidden');
    }
    
  });

});
