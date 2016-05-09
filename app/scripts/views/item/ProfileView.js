define([
  'backbone',
  'models/ApikeyModel',
  'models/SessionModel',
  'hbs!tmpl/item/ProfileView_tmpl'
],
function( Backbone, ApikeyModel, SessionModel, ProfileviewTmpl ) {
    'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    initialize: function() {
      _.bindAll(this, 'onApikeySuccess', 'onApikeyFail');
      console.log("initialize a Profileview ItemView");
      this.model = SessionModel;
    },
    
    template: ProfileviewTmpl,
        

    /* ui selector cache */
    ui: {
      '.alert.alert-success.hidden': 'errorMessage'
    },

    /* Ui events hash */
    events: {
      'click #apikeyGenerate': 'generateApikey'
    },

    generateApikey: function (e) {
      e.preventDefault();
      var apikey = new ApikeyModel({id: this.model.id});
      apikey.save(null, {
        success: this.onApikeySuccess,
        error: this.onApikeyFail
      })
    },

    onApikeySuccess: function () {
      
    },

    onApikeyFail: function () {
      
    }

  });

});
