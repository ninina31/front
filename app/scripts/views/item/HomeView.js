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
      this.collection = new TestCollection();
      this.model = SessionModel;
    },
    
    template: HomeviewTmpl,

    render: function () {
      var that = this;
      this.collection.fetch({
        success: function (collection) {
          that.$el.html(that.template({tests: collection.toJSON()}));
        }
      });
    }
  });
});
