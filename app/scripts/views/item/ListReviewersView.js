define([
  'backbone',
  'hbs!tmpl/item/ListReviewersView_tmpl',
  'collections/ReviewerCollection'
],
function( Backbone, ListreviewersviewTmpl, ReviewerCollection ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      console.log("initialize a ListReviewersview ItemView");
      _.bindAll(this, 'getReviewersSuccess');
      this.collection = new ReviewerCollection();
      this.collection.fetch({
        success: this.getReviewersSuccess
      });
    },
    
      template: ListreviewersviewTmpl,
        
      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {},

    getReviewersSuccess: function (models) {
      this.trigger('fetched', this);
    },

    /* on render callback */
    onRender: function() {}
  });

});
