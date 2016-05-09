define([
	'backbone',
  'models/SessionModel',
	'hbs!tmpl/item/HomeView_tmpl',
  'collections/TestCollection'
],
function( Backbone, SessionModel, HomeviewTmpl, TestCollection ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

    className: 'container',

		initialize: function() {
			console.log("initialize a Homeview ItemView");
      this.collection = new TestCollection();
    },
    
      template: HomeviewTmpl,
        
      /* ui selector cache */
      ui: {},

    /* Ui events hash */
    events: {},

    render: function () {
      var that = this;
      this.collection.fetch({
        success: function (collection) {
          that.$el.html(that.template({tests: collection.toJSON()}));
        }
      });
    },

		/* on render callback */
		onRender: function() {}
	});

});
