define([
  'backbone',
  'underscore',
  'hbs!tmpl/item/GetReviewerView_tmpl'
],
function( Backbone, _, GetreviewerviewTmpl ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a GetReviewerview ItemView");
      _.bindAll(this, 'showReviewer', 'onDeleteSuccess', 'onDeleteFail');
      this.model.fetch({
        success: this.showReviewer
      });
    },
    
      template: GetreviewerviewTmpl,
        

      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {
      'click #deleteReviewer': 'deleteReviewer'
    },

    showReviewer: function (model) {
      this.trigger('fetched', this);
      $('[data-toggle="popover"]').popover({ html: true });
    },

    deleteReviewer: function () {
      this.model.destroy({
        method: 'DELETE',
        success: this.onDeleteSuccess,
        error: this.onDeleteFail
      });
    },

    onDeleteSuccess: function () {
      Backbone.history.navigate("listarCorrectores", {trigger: true});
    },

    onDeleteFail: function () {
      $('.alert.alert-danger').removeClass('hidden');
    }
    
  });

});
