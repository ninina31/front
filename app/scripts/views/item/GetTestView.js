define([
  'backbone',
  'underscore',
  'hbs!tmpl/item/GetTestView_tmpl'
],
function( Backbone, _, GettestviewTmpl ) {
    'use strict';

  var permit = 5;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    initialize: function() {
      _.bindAll(this, "renderView", "onDeleteSuccess", "onDeleteFail");
    },
    
    template: GettestviewTmpl,

    /* Ui events hash */
    events: {
      'click #deleteExam': 'deleteExam'
    },

    fetchContent: function () {
      this.model.fetch({
        success: this.renderView
      });
    },

    renderView: function(){
      this.trigger('fetched', this);
      $('[data-toggle="popover"]').popover({ html: true });
    },

    deleteExam: function () {
      this.model.destroy({
        method: 'DELETE',
        success: this.onDeleteSuccess,
        error: this.onDeleteFail
      });
    },

    onDeleteSuccess: function () {
      Backbone.history.navigate('', {trigger: true});
    },

    onDeleteFail: function () {
      $('.alert.alert-danger').removeClass('hidden');
    }
    
  });

});
