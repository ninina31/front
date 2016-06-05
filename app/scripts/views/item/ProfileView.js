define([
  'backbone',
  'models/ApikeyModel',
  'models/SessionModel',
  'hbs!tmpl/item/ProfileView_tmpl'
],
function( Backbone, ApikeyModel, SessionModel, ProfileviewTmpl ) {
    'use strict';

  var permit = 22;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    initialize: function() {
      _.bindAll(this, 'onApikeySuccess', 'onApikeyFail');
      this.model = SessionModel;
    },
    
    template: ProfileviewTmpl,
        

    /* ui selector cache */
    ui: {
      '.alert.alert-success.hidden': 'errorMessage'
    },

    /* Ui events hash */
    events: {
      'click #apikeyGenerate': 'generateApikey',
      'click #deleteAccount': 'deleteAccount'
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
      $('.alert.alert-danger').removeClass('hidden');
    },

    deleteAccount: function () {
      this.model.destroy({
        method: 'DELETE',
        success: function () {
          Backbone.history.navigate('login', {trigger: true});
        },
        error: function () {
          $('.alert.alert-danger').removeClass('hidden');
        }
      });
    }

  });

});
