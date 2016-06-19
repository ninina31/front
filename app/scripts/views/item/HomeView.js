define([
	'backbone',
  'models/SessionModel',
  'hbs!tmpl/item/HomeView_tmpl',
  'collections/TestCollection'
],
function( Backbone, SessionModel, HomeviewTmpl, TestCollection ) {
    'use strict';

  var permit = 4;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    initialize: function() {
      _.bindAll(this, 'onFetchSuccess', 'onFetchError');
      this.collection = new TestCollection();
      this.model = SessionModel;
    },

    fetchContent: function () {
      this.collection.fetch({
        success: this.onFetchSuccess,
        error: this.onFetchError
      });
    },
    
    template: HomeviewTmpl,

    onFetchSuccess: function () {
      this.model.set({tests: this.collection.toJSON()});
      this.trigger('fetched', this);
    },

    onFetchError: function () {
      // body...
    }

  });
});
